import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Event } from './event.entity';
export enum TagCategory {
  SPECIFIC = 'SPECIFIC',
  GLOBAL = 'GLOBAL',
}

export enum TagType {
  OFFLINE = 'offline',
  ONLINE = 'online',
  BOTH = 'both',
}

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'Tag name', nullable: false })
  name: string;

  @Column({
    type: 'enum',
    enum: TagCategory,
    default: TagCategory.SPECIFIC,
  })
  tagCategory: TagCategory;

  @Column({
    type: 'enum',
    enum: TagType,
    nullable: false,
  })
  tagType: TagType;

  @ManyToMany(() => Event, (event) => event.tags)
  events: Event[];
}
