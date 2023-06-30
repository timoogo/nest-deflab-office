// src/organization/organization.entity.ts

import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Event } from './event.entity';

@Entity({ name: 'organizations'})
export class Organization {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  legalRepresentative: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @ManyToMany(() => User, user => user.organizations)
  users: User[];

  @OneToMany(() => Event, event => event.organizer)
  events: Event[];

  @Column()
  description: string;

  @Column()
  image: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
