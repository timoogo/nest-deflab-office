import {
  Injectable,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GenericEntity } from '@/entities/generic-entity.entity';
import { DeleteResult, QueryFailedError } from 'typeorm';
import { Body } from '@nestjs/common/decorators/http/route-params.decorator';
import { Repository } from 'typeorm';

@Injectable()
export class GenericEntityService {
  constructor(
    @InjectRepository(GenericEntity)
    private readonly genericEntityRepository: Repository<GenericEntity>,
  ) {}

 
  async createGenericEntity(genericEntityData: Partial<GenericEntity>): Promise<GenericEntity> {
    const genericEntity = this.genericEntityRepository.create(genericEntityData);
    return this.genericEntityRepository.save(genericEntity);
  }

  async getGenericEntities(): Promise<GenericEntity[]> {
    return this.genericEntityRepository.find();
  }

  async getById(id: number): Promise<GenericEntity> {
    return this.genericEntityRepository.findOne({ where: { id } });
  }

  async update(id: number, genericEntityData: Partial<GenericEntity>): Promise<GenericEntity> {
    if (!id) {
      throw new BadRequestException('Missing id');
    }
    try {
      await this.genericEntityRepository.update(id, genericEntityData);
      return await this.genericEntityRepository.findOne({ where: { id } });
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new ConflictException(`Duplicate entry: ${error.message}`);
      }
      throw error;
    }
  }
  async delete(id: number): Promise<void> {
    await this.genericEntityRepository.delete(id);
  }
}