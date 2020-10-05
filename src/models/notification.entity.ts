import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  message: string;

  @Column()
  seen: boolean;

  @ManyToOne(
    type => User,
    user => user.notifications,
  )
  user: User;
}
