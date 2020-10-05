import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { User } from './user.entity';

export enum HearingName {
  A = 'Audiencia de Conciliación demanda y excepciones',
  B = 'Audiencia de Ofrecimiento y Admisión de pruebas',
  C = 'Audiencia incidental',
  D = 'Audiencia de Desahogo de Pruebas',
  E = 'Confesional de la parte actora',
  F = 'Interrogatorio Libre de la parte actora',
  G = 'Testimonial de la parte actora',
  H = 'Inspección de la parte actora',
  I = 'Pericial de parte actora',
  J = 'Ratificación de documentos de la parte actora',
  K = 'Pericial médica',
  L = 'Toma de muestras',
  M = 'Confesional de la parte demandada',
  N = 'Interrogatorio Libre de la parte demandada',
  O = 'Testimonial de la parte demandada',
  P = 'Inspección de la parte demandada',
  Q = 'Pericial de la parte actora',
  R = 'Ratificación de documentos de la parte demandada',
}

@Entity()
export class Hearing {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({
    type: 'enum',
    enum: HearingName,
    default: HearingName.A,
  })
  name: HearingName;

  @Column()
  date: Date;

  @Column()
  time: number;

  @ManyToOne(
    type => User,
    user => user.hearings,
  )
  lawyer: User;
}
