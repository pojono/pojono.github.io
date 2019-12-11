import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Course extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
}
