import {
  Injectable,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from '../entities/tag.entity';
import { DeleteResult, QueryFailedError } from 'typeorm';
import { TagRepository } from '../repositories/tag.repository';
import { Body } from '@nestjs/common/decorators/http/route-params.decorator';
@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: TagRepository,
  ) {}

 
  async createTag(tagData: Partial<Tag>): Promise<Tag> {
    const tag = this.tagRepository.create(tagData);
    return this.tagRepository.save(tag);
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
