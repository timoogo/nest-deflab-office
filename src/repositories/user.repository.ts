// src/repositories/user.repository.ts

import { DeleteResult, EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async delete(id: number): Promise<DeleteResult> {
    return await this.createQueryBuilder()
      .delete()
      .where('id = :id', { id })
      .execute();
  }
}
