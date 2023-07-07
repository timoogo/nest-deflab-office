import {
  Injectable,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../repositories/user.repository';
import { User } from '../entities/user.entity';
import { DeleteResult, QueryFailedError } from 'typeorm';
import { isEqual } from 'lodash';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
  ) {}

  async createUser(userData: Partial<User>): Promise<User> {
    const user = this.userRepository.create(userData);

    try {
      return await this.userRepository.save(user);
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        error.message.includes('Duplicate entry')
      ) {
        const duplicateProperties = [];
        const duplicateValues = [];

        for (const property in userData) {
          const value = userData[property];
          const existingUser = await this.userRepository.findOne({
            where: { [property]: value },
          });

          if (existingUser) {
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

  async getUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getUserById(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  async update(id: number, userData: Partial<User>): Promise<User> {
    // Fetch the current entity from the database
    const currentEntity = await this.userRepository.findOne({ where: { id } });

    // Check if the current entity and the updated entity are identical
    if (isEqual(currentEntity, { ...currentEntity, ...userData })) {
      throw new BadRequestException('No changes were made.');
    }

    try {
      await this.userRepository.update(id, userData);
      return await this.userRepository.findOne({ where: { id } });
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new ConflictException(`Duplicate entry: ${error.message}`);
      }
      throw error;
    }
  }
  async deleteUser(id: number): Promise<DeleteResult> {
    return this.userRepository.delete(id);
  }
}
