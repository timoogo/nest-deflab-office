import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from '../entities/tag.entity';
import { DeleteResult } from 'typeorm';
import { TagRepository } from '../repositories/tag.repository';

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
  async updateTag(id: number, tagData: Partial<Tag>): Promise<Tag> {
    await this.tagRepository.update(id, tagData);
    return this.getTagById(id);
  }

  async deleteTag(id: number): Promise<DeleteResult> {
    return this.tagRepository.delete(id);
  }
}
