// src/user/user.entity.ts

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { Event } from './event.entity';
import { Organization } from './organization.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, default: 'user' })
  name: string;

  @Column({ nullable: false, unique: true, default: 'user@user.fr' })
  email: string;

  @Column({ nullable: false, unique: true, default: '0606060606' })
  phone: string;

  @Column({ nullable: false, default: 'user' })
  password: string;

  @OneToMany(() => Event, (event) => event.participants)
  events: Event[];

  @ManyToMany(() => Organization, (organization) => organization.users)
  organizations: Organization[];

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
