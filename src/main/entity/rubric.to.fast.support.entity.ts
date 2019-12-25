import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('rubric_to_fast_support')
export class RubricToFastSupport extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  rubricId: number;

  @Column({ nullable: false })
  fastSupportId: number;

  @Column({ nullable: true })
  orderIndex: number;
}
