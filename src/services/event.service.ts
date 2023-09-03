import {
  Injectable,
  ConflictException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryFailedError } from 'typeorm';
import { User } from '../entities/user.entity';
import { Event } from '../entities/event.entity';
import { Organization } from '../entities/organization.entity';
import * as _ from 'lodash';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,

    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Organization)
    private organizationRepository: Repository<Organization>,
  ) {}

  async create(eventData: Partial<Event>): Promise<Event> {
    if (!eventData || !eventData.organizer) {
      throw new Error('EventData or organizer is missing');
    }
    const organizer = await this.organizationRepository.findOne({
      where: { id: eventData.organizer.id },
    });

    if (!eventData.participants) {
      throw new Error('Participants are missing');
    }
    const participants = await this.userRepository.findByIds(
      eventData.participants.map((p) => p.id),
    );

    eventData.organizer = organizer;
    eventData.participants = participants;

    const event = this.eventRepository.create(eventData);

    try {
      return await this.eventRepository.save(event);
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        error.message.includes('Duplicate entry')
      ) {
        const duplicateProperties = [];
        const duplicateValues = [];

        for (const property in eventData) {
          const value = eventData[property];
          const existingEvent = await this.eventRepository.findOne({
            where: { [property]: value },
          });

          if (existingEvent) {
            duplicateProperties.push(property);
            duplicateValues.push(value);
          }
        }

        const errorResponse = {
          message: 'Duplicate entry',
          properties: duplicateProperties,
          values: duplicateValues,
          statusCode: 409,
          error: 'Conflict',
        };

        throw new ConflictException(errorResponse);
      }

      throw error;
    }
  }

  async getAll(): Promise<Event[]> {
    return this.eventRepository.find();
  }

    async getById(id: number): Promise<Event> {
      return this.eventRepository.findOne({ where: { id } });
    }

  async update(id: number, eventData: Partial<Event>): Promise<Event> {
    const originalEvent = await this.eventRepository.findOne({
      where: { id },
      relations: ['participants'],
    });

    if (!originalEvent) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }

    const hasChanges = !_.isEqual(originalEvent, eventData);
    if (!hasChanges) {
      throw new ConflictException(`Duplicate entry`);
    }

    // Load the actual User entities for the participants
    if (eventData.participants) {
      const participants = await this.userRepository.findByIds(
        eventData.participants.map((p) => p.id),
      );

      if (participants.length !== eventData.participants.length) {
        const existingParticipantIds = participants.map((p) => p.id);
        const nonExistingParticipantIds = eventData.participants
          .filter((p) => !existingParticipantIds.includes(p.id))
          .map((p) => p.id);

        throw new BadRequestException({
          message: 'Some participants do not exist',
          participantIdMissing: nonExistingParticipantIds,
        });
      }

      eventData.participants = participants;
    }

    // Assign the updated data to the original event
    Object.assign(originalEvent, eventData);

    try {
      await this.eventRepository.save(originalEvent);
      return originalEvent;
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new ConflictException(`Duplicate entry: ${error.message}`);
      }
      throw error;
    }
  }

  async delete(id: number): Promise<void> {
    await this.eventRepository.delete(id);
  }
}
