import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('promocode')
export class Promocode extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  text: string;

  @Column({ nullable: false, default: 0 })
  amountTotal: number;

  @Column({ nullable: false, default: 0 })
  amountLeft: number;

  @Column({ nullable: true })
  months: number;

  @Column({ nullable: true })
  price: number;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  method: string;

  @Column({ nullable: true })
  isCorporate: boolean;

  @Column({ nullable: true })
  creationDate: Date;

  @Column({ nullable: true })
  paymentDate: Date;
}
