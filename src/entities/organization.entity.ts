// src/organization/organization.entity.ts

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { User } from './user.entity';
import { Event } from './event.entity';

@Entity({ name: 'organizations' })
export class Organization {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  name: string;

  @ManyToOne(() => User, (user) => user.organizations)
  userRepresentative: User;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ unique: true, nullable: false })
  phone: string;

  @ManyToMany(() => User, (user) => user.organizations)
  users: User[];

  @OneToMany(() => Event, (event) => event.organizer)
  events: Event[];

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  image: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
