import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Organization } from './organization.entity';
import { User } from './user.entity';
import { Tag } from './tag.entity';

@Entity({ name: 'events' })
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'Event name', nullable: false })
  name: string;

  @ManyToOne(() => Organization, (organizer) => organizer.events)
  organizer: Organization;

  @ManyToMany(() => User, (user) => user.events)
  @JoinTable() // Add the JoinTable decorator to specify the join table for the Many-to-Many relationship
  participants: User[];

  @ManyToMany(() => Tag, (tag) => tag.events)
  @JoinTable()
  tags: Tag[];

  @Column({ default: 'Event description', nullable: false })
  description: string;

  @Column({ default: 'Event image', nullable: false })
  image: string;

  @Column({ default: 'Event location', nullable: false })
  location: string;

  @Column({ default: 'Event type', nullable: false })
  type: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @Column({ default: 0, nullable: false })
  duration: number;

  @Column({ default: 'Event status', nullable: false })
  status: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
