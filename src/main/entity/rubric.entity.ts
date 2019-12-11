import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Rubric extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
}
