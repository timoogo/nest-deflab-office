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
import { GenericEntity } from '../entities/generic-entity.entity';
import { GenericEntityService } from '@/services/generic-entity.service';
import { DeleteResult } from 'typeorm';

@Controller('api/generic-entity')
export class GenericEntityController  {
  constructor(private readonly service: GenericEntityService) {}

  
  @Post()
  async create(@Body() genericEntityData: Partial<GenericEntity>): Promise<GenericEntity> {
    return this.service.createGenericEntity(genericEntityData);
  }


  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.service.delete(id);
  }

  @Get()
  getAll(): Promise<GenericEntity[]> {
    return this.service.getGenericEntities();
  }
  @Get(':id')
  getById(@Param('id') id: number): Promise<GenericEntity> {
    return this.service.getById(id);
  }
  @Put(':id')
  update(@Param('id') id: number, @Body() data: Partial<GenericEntity>): Promise<GenericEntity> {
    return this.service.update(id, data);
  }

  @Get()
  getResponse(): string {
    return 'Hello World!';
  }
}
