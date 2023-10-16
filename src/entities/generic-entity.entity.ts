import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Event } from './event.entity';

@Entity()
export class GenericEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'unset', nullable: false })
  entityName: string;

  @Column({ default: 'unset', nullable: false})
  entityType: 'online' | 'offline' | 'both' | 'unset';

  @Column({nullable: false, default: 'unset'})
  entityCategory: string

  @Column({nullable: true})
  entityColor: string
}
