import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('fast_support')
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

  @Column({ nullable: true })
  affirmation: string;

  @Column({ nullable: true })
  affirmationForShare: string;

  @Column({ nullable: true })
  affirmationText: string;

  @Column({ nullable: true })
  quoteAuthor: string;
}
