import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FastSupport extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
}
