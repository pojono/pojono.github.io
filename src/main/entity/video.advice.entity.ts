import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('video_advice')
export class VideoAdvice extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  url: string;

  @Column({ nullable: true })
  duration: string;

  @Column({ nullable: false })
  forMainPage: boolean;

  @Column({ nullable: true })
  colour: string;
}
