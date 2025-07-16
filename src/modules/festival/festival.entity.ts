import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Region } from '../place/place.entity';

@Entity()
export class Festival {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Region, (region) => region.festivals)
  @JoinColumn({ name: 'region_id' })
  region: Region;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @Column()
  theme: string;

  @Column()
  thumbnail: string;

  @Column()
  description: string;
}
