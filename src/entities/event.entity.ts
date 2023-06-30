// src/event/event.entity.ts

import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany } from 'typeorm';
import { Organization } from './organization.entity';
import { User } from './user.entity';

@Entity({ name: 'events'})
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Organization, organizer => organizer.events)
  organizer: Organization;

  @ManyToMany(() => User, user => user.events)
  participants: User[];

  @Column()
  tags: string;

  @Column()
  description: string;

  @Column()
  image: string;

  @Column()
  location: string;

  @Column()
  type: string;

  @Column()
  date: Date;

  @Column()
  duration: number;

  @Column()
  status: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
