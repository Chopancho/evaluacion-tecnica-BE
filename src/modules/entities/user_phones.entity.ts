import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('users_phones')
export class UserPhone {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  number: number;

  @Column({ unique: true })
  city_code: number;

  @Column()
  country_code: number;

  @ManyToOne(() => User, (user) => user.phones)
  user: User;
}
