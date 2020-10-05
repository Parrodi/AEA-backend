import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Process } from './process.entity';

export enum UserRole {
  ADMIN = 'admin',
  ASIGNER = 'asigner',
  NORMAL = 'normal',
}

@Entity()
export class Assignment {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  time_limit: number;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.NORMAL,
  })
  user_role: UserRole;

  @OneToOne(type => Assignment)
  @JoinColumn()
  next_assignment: Assignment;

  @OneToMany(
    type => Process,
    process => process.assignment,
  )
  processes: Process[];
}
