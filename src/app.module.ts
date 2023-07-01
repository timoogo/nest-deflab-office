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
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'nest_deflab_office',
      entities: [User, Event, Organization, Tag],
      synchronize: true,
    }),
    EventModule,
    UserModule,
    OrganizationModule,
    TagModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
