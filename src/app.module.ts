import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user.module';
import { EventModule } from './modules/event.module';
import { OrganizationModule } from './modules/organization.module';
import { User } from './entities/user.entity';
import { Event } from './entities/event.entity';
import { Organization } from './entities/organization.entity';
import { Tag } from './entities/tag.entity';
import { TagModule } from './modules/tag.module';
import { GenericEntityModule } from './modules/tag.module copy';
import { GenericEntity } from './entities/generic-entity.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      keepConnectionAlive: true,
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'Theo',
      password: 't090992',
      database: 'nest_deflab_office',
      entities: [User, Event, Organization, Tag, GenericEntity],
      synchronize: true,
      migrations: ['src/migration/*.ts'],
      

    }),
    EventModule,
    UserModule,
    OrganizationModule,
    TagModule,
    GenericEntityModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
