import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RubricToCourse extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
}
