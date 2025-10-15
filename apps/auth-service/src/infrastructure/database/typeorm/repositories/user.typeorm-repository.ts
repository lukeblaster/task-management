import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../../domain/entities/user.entity';
import { UserRepository } from '../../../../domain/repositories/user.repository';
import { UserTypeOrmEntity } from '../entities/user.typeorm-entity';

@Injectable()
export class TypeOrmUserRepository implements UserRepository {
  constructor(
    @InjectRepository(UserTypeOrmEntity)
    private readonly typeOrmRepository: Repository<UserTypeOrmEntity>,
  ) {}

  async findById(id: string): Promise<User | null> {
    const userEntity = await this.typeOrmRepository.findOne({ where: { id } });
    if (!userEntity) {
      return null;
    }
    return this.toDomain(userEntity);
  }

  async findByEmail(email: string): Promise<User | null> {
    const userEntity = await this.typeOrmRepository.findOne({
      where: { email },
    });
    if (!userEntity) {
      return null;
    }
    return this.toDomain(userEntity);
  }

  async create(user: User): Promise<void> {
    const userEntity = this.toTypeOrmEntity(user);
    await this.typeOrmRepository.save(userEntity);
  }

  async update(user: User): Promise<void> {
    const userEntity = this.toTypeOrmEntity(user);
    await this.typeOrmRepository.save(userEntity);
  }

  async delete(id: string): Promise<void> {
    await this.typeOrmRepository.delete(id);
  }

  private toDomain(entity: UserTypeOrmEntity): User {
    return User.create(
      {
        name: entity.name,
        email: entity.email,
        password: entity.password,
        createdAt: entity.createdAt,
        updatedAt: entity.updatedAt,
      },
      entity.id,
    );
  }

  private toTypeOrmEntity(domain: User): UserTypeOrmEntity {
    const entity = new UserTypeOrmEntity();
    entity.id = domain.id;
    entity.name = domain.name;
    entity.email = domain.email;
    entity.password = domain.password;
    entity.createdAt = domain.createdAt;
    entity.updatedAt = domain.updatedAt;
    return entity;
  }
}
