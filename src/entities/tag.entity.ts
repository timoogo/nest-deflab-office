import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Event } from './event.entity';



@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'unset', nullable: false })
  tagName: string;

  @Column({ default: 'unset', nullable: false})
  tagType: 'online' | 'offline' | 'both' | 'unset';

  @Column({nullable: false, default: 'unset'})
  tagCategory: string

  @Column({nullable: true})
  tagColor: string

  @ManyToMany(() => Event, (event) => event.tags)
  events: Event[];
}
