import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, QueryFailedError } from 'typeorm';
import { Organization } from '../entities/organization.entity';
import { OrganizationRepository } from '../repositories/organization.repository';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(Organization)
    private readonly organizationRepository: OrganizationRepository,
  ) {}

  async create(organizationData: Partial<Organization>): Promise<Organization> {
    const organization = this.organizationRepository.create(organizationData);

    try {
      return await this.organizationRepository.save(organization);
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        error.message.includes('Duplicate entry')
      ) {
        const duplicateProperties = [];
        const duplicateValues = [];

        for (const property in organizationData) {
          const value = organizationData[property];
          const existingOrganization =
            await this.organizationRepository.findOne({
              where: { [property]: value },
            });

          if (existingOrganization) {
            duplicateProperties.push(property);
            duplicateValues.push(value);
          }
        }

        const errorResponse = {
          message: 'Duplicate entry',
          properties: duplicateProperties,
          values: duplicateValues,
          statusCode: 409,
          error: 'Conflict',
        };

        throw new ConflictException(errorResponse);
      }

      throw error;
    }
  }

  getAll(): Promise<Organization[]> {
    return this.organizationRepository.find();
  }

  getById(id: number): Promise<Organization> {
    return this.organizationRepository.createQueryBuilder('organization')
        .leftJoinAndSelect('organization.userRepresentative', 'userRepresentative')
        .where('organization.id = :id', { id })
        .getOne();
}


  async update(
    id: number,
    organizationData: Partial<Organization>,
  ): Promise<Organization> {
    try {
      await this.organizationRepository.update(id, organizationData);
      return await this.organizationRepository.findOne({ where: { id } });
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new ConflictException(`Duplicate entry: ${error.message}`);
      }
      throw error;
    }
  }

  delete(id: number): Promise<DeleteResult> {
    return this.organizationRepository.delete(id);
  }
}
