// src/services/user.service.ts

import { Injectable } from '@nestjs/common';
import { Event } from '../entities/event.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { Organization } from '../entities/organization.entity';
@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>, // Use Repository<Event>

    @InjectRepository(User)
    private userRepository: Repository<User>, // Use Repository<User>

    @InjectRepository(Organization)
    private organizationRepository: Repository<Organization>, // Use Repository<Organization>
  ) {}
  async create(eventData: Partial<Event>): Promise<Event> {
    if (!eventData || !eventData.organizer) {
      throw new Error('EventData or organizer is missing');
    }
    // Fetch the actual entities for organizer and participants
    const organizer = await this.organizationRepository.findOne({
      where: { id: eventData.organizer.id },
    });

    if (!eventData.participants) {
      throw new Error('Participants are missing');
    }
    const participants = await this.userRepository.findByIds(
      eventData.participants.map((p) => p.id),
    );

    // Assign the fetched entities to the eventData
    eventData.organizer = organizer;
    eventData.participants = participants;

    // Now create and save the event with the related entities
    const event = this.eventRepository.create(eventData);
    return this.eventRepository.save(event);
  }

  async getAll(): Promise<Event[]> {
    return this.eventRepository.find();
  }

  async getById(id: number): Promise<Event> {
    return this.eventRepository.findOne({ where: { id } });
  }

  async update(id: number, eventData: Partial<Event>): Promise<Event> {
    await this.eventRepository.update(id, eventData);
    return this.getById(id);
  }

  async delete(id: number): Promise<void> {
    await this.eventRepository.delete(id);
  }
}
