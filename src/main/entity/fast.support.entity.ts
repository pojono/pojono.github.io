import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FastSupport extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  trackId: number;

  @Column({ nullable: false })
  forMainPage: boolean;

  @Column({ nullable: true })
  colour: string;

  @Column({ nullable: true })
  duration: string;
}
