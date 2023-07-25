// src/controllers/user.controller.ts

import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { User } from '../entities/user.entity';
import { BaseInterface } from './base.interface';
import { DeleteResult } from 'typeorm';

@Controller('api/users')
export class UserController implements BaseInterface<User> {
  constructor(private readonly service: UserService) {}

  @Get()
  getAll(): Promise<User[]> {
    return this.service.getUsers();
  }

  @Get(':id')
  getById(@Param('id') id: number): Promise<User> {
    return this.service.getUserById(id);
  }

  @Post()
  create(@Body() userData: Partial<User>): Promise<User> {
    return this.service.createUser(userData);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() userData: Partial<User>,
  ): Promise<User> {
    return this.service.update(id, userData);
  }

  @Delete(':id')
  delete(id: number): Promise<DeleteResult> {
    return this.service.deleteUser(id);
  }
}
