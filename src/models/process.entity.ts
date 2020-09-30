import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { User } from './user.entity';
import { Hearing } from './hearing.entity';
import { Assignment } from './assignment.entity';

export enum ProcessType {
  LOCAL = 'local',
  FEDERAL = 'federal',
}

@Entity()
export class Process {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;

  @Column()
  number: number;

  @Column()
  actor: string;

  @Column()
  defendant: string;

  @Column({
    type: 'enum',
    enum: ProcessType,
    default: ProcessType.LOCAL,
  })
  type: ProcessType;

  @ManyToOne(
    type => User,
    user => user.processes,
  )
  current_user: User;

  @ManyToOne(
    type => Assignment,
    assignment => assignment.processes,
  )
  assignment: Assignment;

  @OneToOne(
    type => Hearing,
    hearing => hearing.process,
  )
  hearing: Hearing;
}
