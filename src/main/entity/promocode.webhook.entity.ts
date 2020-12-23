import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('promocode_webhook')
export class PromocodeWebhook extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  promocodeId: number;

  @Column({ nullable: true })
  webhook: string;

  @Column({ nullable: true })
  datetime: Date;
}
