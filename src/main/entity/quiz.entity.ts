import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { EntityEnum } from '../enitity.enum';
import { ActionNamesEnum } from '../action.names.enum';
import { ActionTypesEnum } from '../action.types.enum';
import { EventDescriptionEnum } from '../event.description.enum';

@Entity('quiz')
export class Quiz extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  type: ActionTypesEnum;

  @Column({ nullable: true })
  multichoiceAnswerId: number;

  @Column({ nullable: true })
  rangeAnswerId: number;

  @Column({ nullable: true })
  rangeFrom: number;

  @Column({ nullable: true })
  rangeTo: number;

  @Column({ nullable: true })
  rangeStep: number;

  @Column({ nullable: true })
  inputAnswerId: number;

  @Column({ nullable: true })
  actionAnswerId: number;

  @Column({ nullable: true })
  actionName: ActionNamesEnum;

  @Column({ nullable: true })
  gotoEntity: EntityEnum;

  @Column({ nullable: true })
  gotoEntityId: number;

  @Column({ nullable: true })
  eventDescription: EventDescriptionEnum;
}
