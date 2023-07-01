// src/modules/organization/organization.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationController } from '../controllers/organization.controller';
import { OrganizationService } from '../services/organization.service';
import { OrganizationRepository } from '../repositories/organization.repository';
import { Organization } from '../entities/organization.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Organization, OrganizationRepository])],
  controllers: [OrganizationController],
  providers: [OrganizationService, OrganizationRepository],
  exports: [OrganizationRepository],
})
export class OrganizationModule {}
