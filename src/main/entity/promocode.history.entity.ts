import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('promocode_history')
export class PromocodeHistory extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  userId: number;

  @Column({ nullable: false })
  promocodeId: number;

  @Column({ nullable: false })
  datetime: Date;
}
