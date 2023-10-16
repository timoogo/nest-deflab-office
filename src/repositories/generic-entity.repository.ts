// src/repositories/generic-entity.repository.ts

import { DeleteResult, EntityRepository, Repository } from 'typeorm';
import { GenericEntity } from '../entities/generic-entity.entity';

@EntityRepository(GenericEntity)
export class GenericEntityRepository extends Repository<GenericEntity> {
  async delete(id: number): Promise<DeleteResult> {
    console.log('id', id);
    return await this.createQueryBuilder()
      .delete()
      .where('id = :id', { id })
      .execute();
  }
}
