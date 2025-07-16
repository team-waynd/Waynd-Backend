import { Column, CreateDateColumn, Entity } from 'typeorm';

import { PrimaryGeneratedColumn } from 'typeorm/decorator/columns/PrimaryGeneratedColumn';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  provider: 'kakao' | 'google';
  @Column()
  providerId: string;
  @Column()
  email: string;
  @Column()
  name: string;
  @Column()
  profileImage: string;
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
  @Column({ nullable: true })
  refreshToken: string;
}
