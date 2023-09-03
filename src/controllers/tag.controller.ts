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

@Controller('api/tags')
export class TagController  {
  constructor(private readonly service: TagService) {}

  
  @Post()
  async create(@Body() tagData: Partial<Tag>): Promise<Tag> {
    return this.service.createTag(tagData);
  }


  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.service.delete(id);
  }

  @Get()
  getAll(): Promise<Tag[]> {
    return this.service.getTags();
  }
  @Get(':id')
  getById(@Param('id') id: number): Promise<Tag> {
    return this.service.getById(id);
  }
  @Put(':id')
  update(@Param('id') id: number, @Body() data: Partial<Tag>): Promise<Tag> {
    return this.service.update(id, data);
  }

  @Get()
  getResponse(): string {
    return 'Hello World!';
  }
}
