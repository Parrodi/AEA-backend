import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
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

  @Column()
  name: string;

  @Column()
  time_limit: number;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.NORMAL,
  })
  role: UserRole;

  @OneToMany(
    type => Process,
    process => process.assignment,
  )
  processes: Process[];
}
