import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Lesson extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
}
