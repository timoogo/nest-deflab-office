import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { OrganizationService } from '../services/organization.service';
import { Organization } from '../entities/organization.entity';
import { DeleteResult } from 'typeorm';

@Controller('api/organizations')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Post()
  create(@Body() data: Partial<Organization>): Promise<Organization> {
    return this.organizationService.create(data);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<DeleteResult> {
    return this.organizationService.delete(id);
  }

  @Get()
  getAll(): Promise<Organization[]> {
    return this.organizationService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: number): Promise<Organization> {
    return this.organizationService.getById(id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() dataOrganization: Partial<Organization>,
  ): Promise<Organization> {
    return this.organizationService.update(id, dataOrganization);
  }
}
