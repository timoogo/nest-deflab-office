import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { BaseInterface } from './base.interface';
import { Tag } from '../entities/tag.entity';
import { TagService } from '../services/tag.service';
import { DeleteResult } from 'typeorm';

@Controller('tags')
export class TagController implements BaseInterface<Tag> {
  constructor(private readonly service: TagService) {}
  @Post()
  create(data: Partial<Tag>): Promise<Tag> {
    return this.service.createTag(data);
  }
  @Delete(':id')
  delete(id: number): Promise<DeleteResult> {
    return this.service.deleteTag(id);
  }

  @Get()
  getAll(): Promise<Tag[]> {
    return this.service.getTags();
  }
  @Get(':id')
  getById(id: number): Promise<Tag> {
    return this.service.getTagById(id);
  }
  @Put(':id')
  update(id: number, data: Partial<Tag>): Promise<Tag> {
    return this.service.updateTag(id, data);
  }
}
