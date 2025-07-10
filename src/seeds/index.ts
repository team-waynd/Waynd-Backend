import 'dotenv/config';

import { DataSource } from 'typeorm';
import { Festival } from '../modules/festival/festival.entity';
import { Region } from '../modules/place/place.entity';
import { seedFestivals } from './festival.seed';
import { seedRegions } from './region.seed';

const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306', 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Region, Festival],
  synchronize: true,
});

async function seedAll() {
  await dataSource.initialize();
  console.log('Database connected');

  await seedRegions(dataSource);
  await seedFestivals(dataSource);

  console.log('Seeding completed');
  process.exit(0);
}

seedAll().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
