// src/user/user.entity.ts

import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany } from 'typeorm';
import { Event } from './event.entity';
import { Organization } from './organization.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  password: string;

  @OneToMany(() => Event, event => event.participants)
  events: Event[];

  @ManyToMany(() => Organization, organization => organization.users)
  organizations: Organization[];

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
