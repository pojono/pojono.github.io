import { BaseEntity, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('quiz')
export class Quiz extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
}
