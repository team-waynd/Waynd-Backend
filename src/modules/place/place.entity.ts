import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('regions')
export class Region {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}

@Entity('tour_spots')
export class Tour_spot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  region_id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  thumbnail: string;

  @Column()
  category: string;

  @Column({
    type: 'enum',
    enum: ['tour', 'food', 'history', 'activity', 'healing'],
  })
  theme: 'tour' | 'food' | 'history' | 'activity' | 'healing';
}

@Entity('food_spots')
export class Food_spot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  region_id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  thumbnail: string;

  @Column()
  category: string;

  @Column()
  rating: number;
}
