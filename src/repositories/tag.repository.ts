// src/repositories/tag.repository.ts

import { DeleteResult, EntityRepository, Repository } from 'typeorm';
import { Tag } from '../entities/tag.entity';

@EntityRepository(Tag)
export class TagRepository extends Repository<Tag> {
  async delete(id: number): Promise<DeleteResult> {
    return await this.createQueryBuilder()
      .delete()
      .where('id = :id', { id })
      .execute();
  }
}
