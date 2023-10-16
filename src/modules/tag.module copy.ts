import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenericEntity } from '../entities/generic-entity.entity';
import { GenericEntityController } from '../controllers/generic-entity.controller';
import { GenericEntityService } from '../services/generic-entity.service';
@Module({
  imports: [TypeOrmModule.forFeature([GenericEntity])],
  controllers: [GenericEntityController],
  providers: [GenericEntityService],
  exports: [GenericEntityService],
})
export class GenericEntityModule {}
