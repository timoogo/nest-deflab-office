import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Param,
  Body,
} from '@nestjs/common';
import { EventService } from '../services/event.service';
import { Event } from '../entities/event.entity';

@Controller('api/events')
export class EventController {
  constructor(private readonly service: EventService) {}

  @Post()
  create(@Body() eventData: Partial<Event>): Promise<Event> {
    return this.service.create(eventData);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.service.delete(id);
  }

  @Get()
  getAll(): Promise<Event[]> {
    return this.service.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: number): Promise<Event> {
    return this.service.getById(id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() data: Partial<Event>,
  ): Promise<Event> {
    return this.service.update(id, data);
  }
}
