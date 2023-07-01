//src/repositories/organization.repository.ts

import { DeleteResult, EntityRepository, Repository } from 'typeorm';
import { Organization } from '../entities/organization.entity';

@EntityRepository(Organization)
export class OrganizationRepository extends Repository<Organization> {
  async delete(id: number): Promise<DeleteResult> {
    return await this.createQueryBuilder()
      .delete()
      .where('id = :id', { id })
      .execute();
  }
}
