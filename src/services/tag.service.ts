import {
  Injectable,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from '../entities/tag.entity';
import { DeleteResult, QueryFailedError } from 'typeorm';
import { TagRepository } from '../repositories/tag.repository';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: TagRepository,
  ) {}

  async createTag(tagData: Partial<Tag>): Promise<Tag> {
    const tag = this.tagRepository.create(tagData);

    try {
      return await this.tagRepository.save(tag);
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        error.message.includes('Duplicate entry')
      ) {
        const duplicateProperties = [];
        const duplicateValues = [];

        for (const property in tagData) {
          const value = tagData[property];
          const existingTag = await this.tagRepository.findOne({
            where: { [property]: value },
          });

          if (existingTag) {
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

  async getTags(): Promise<Tag[]> {
    return this.tagRepository.find();
  }

  async getTagById(id: number): Promise<Tag> {
    return this.tagRepository.findOne({ where: { id } });
  }

  async update(id: number, tagData: Partial<Tag>): Promise<Tag> {
    if (!id) {
      throw new BadRequestException('Missing id');
    }
    try {
      await this.tagRepository.update(id, tagData);
      return await this.tagRepository.findOne({ where: { id } });
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new ConflictException(`Duplicate entry: ${error.message}`);
      }
      throw error;
    }
  }
  async deleteTag(id: number): Promise<DeleteResult> {
    return this.tagRepository.delete(id);
  }
}
