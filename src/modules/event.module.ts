import { EventController } from '../controllers/event.controller';
import { EventService } from '../services/event.service';
import { OrganizationModule } from './organization.module';
import { UserModule } from './user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Event } from '../entities/event.entity';
import { Organization } from '../entities/organization.entity';
import { User } from '../entities/user.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([Event, User, Organization]), // include User and Organization
    UserModule, // include UserModule
    OrganizationModule, // include OrganizationModule
  ],
  providers: [EventService],
  controllers: [EventController],
})
export class EventModule {}
