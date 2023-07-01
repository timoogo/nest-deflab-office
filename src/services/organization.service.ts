import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Organization } from '../entities/organization.entity';
import { OrganizationRepository } from '../repositories/organization.repository';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(Organization)
    private readonly organizationRepository: OrganizationRepository,
  ) {}

  getAll(): Promise<Organization[]> {
    return this.organizationRepository.find();
  }

  getById(id: number): Promise<Organization> {
    return this.organizationRepository
      .createQueryBuilder('organization')
      .leftJoinAndSelect('organization.users', 'users')
      .where('organization.id = :id', { id })
      .getOne();
  }

  create(organizationData: Partial<Organization>): Promise<Organization> {
    const organization = this.organizationRepository.create(organizationData);
    return this.organizationRepository.save(organization);
  }

  async update(
    id: number,
    organizationData: Partial<Organization>,
  ): Promise<Organization> {
    await this.organizationRepository.update(id, organizationData);
    return this.getById(id);
  }

  delete(id: number): Promise<DeleteResult> {
    return this.organizationRepository.delete(id);
  }
}
