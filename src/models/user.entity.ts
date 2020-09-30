import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Notification } from './notification.entity';
import { Hearing } from './hearing.entity';
import { Process } from './process.entity';

export enum UserType {
  LOCAL = 'local',
  FEDERAL = 'federal',
}

export enum UserRole {
  ADMIN = 'admin',
  ASIGNER = 'asigner',
  NORMAL = 'normal',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;

  @Column()
  last_name: string;

  @Column({
    type: 'enum',
    enum: UserType,
    default: UserType.LOCAL,
  })
  type: UserType;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.NORMAL,
  })
  role: UserRole;

  @OneToMany(
    type => Notification,
    notification => notification.user,
  )
  notifications: Notification[];

  @OneToMany(
    type => Hearing,
    hearing => hearing.user,
  )
  hearings: Hearing[];

  @OneToMany(
    type => Process,
    process => process.user,
  )
  processes: Process[];
}
