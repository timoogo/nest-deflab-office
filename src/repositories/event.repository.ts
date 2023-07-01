// src/repositories/Event.repository.ts

import { DeleteResult, EntityRepository, Repository } from 'typeorm';
import { Event } from '../entities/Event.entity';

@EntityRepository(Event)
export class EventRepository extends Repository<Event> {
  async delete(id: number): Promise<DeleteResult> {
    return await this.createQueryBuilder()
      .delete()
      .where('id = :id', { id })
      .execute();
  }
}
