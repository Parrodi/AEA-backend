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

@Entity()
export class Process {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;

  @Column()
  number: number;

  @Column()
  company: string;

  @ManyToOne(
    type => User,
    user => user.processes,
  )
  user: User;

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
