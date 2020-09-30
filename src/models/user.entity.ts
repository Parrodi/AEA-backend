import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { IsEmail, IsDefined } from "class-validator";
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

@Entity({name: 'users'})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  @IsDefined()
  name: string;

  @Column()
  @IsDefined()
  last_name: string;

  @Column({unique: true})
  @IsEmail()
  @IsDefined()
  email: string;

  @Column({
    type: 'enum',
    enum: UserType,
    default: UserType.LOCAL,
  })
  @IsDefined()
  type: UserType;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.NORMAL,
  })
  @IsDefined()
  role: UserRole;

  @OneToMany(
    type => Notification,
    notification => notification.user,
  )
  notifications: Notification[];

  @OneToMany(
    type => Hearing,
    hearing => hearing.lawyer,
  )
  hearings: Hearing[];

  @OneToMany(
    type => Process,
    process => process.current_user,
  )
  processes: Process[];
}
