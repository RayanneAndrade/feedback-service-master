import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Feedback {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  rating: number;

  @Column()
  comment: string;

  @Column()
  createdAt: Date;
}
