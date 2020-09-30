import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne } from 'typeorm';
import { User } from './user.entity';
import { Process } from './process.entity';

export enum HearingType {
  LOCAL = 'local',
  FEDERAL = 'federal',
}

@Entity()
export class Hearing {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: HearingType,
    default: HearingType.LOCAL,
  })
  type: HearingType;

  @Column()
  date: Date;

  @Column()
  time: number;

  @Column()
  number: number;

  @Column()
  actor: string;

  @Column()
  company: string;

  @ManyToOne(
    type => User,
    user => user.hearings,
  )
  user: User;

  @OneToOne(
    type => Process,
    process => process.hearing,
  )
  process: Process;
}
