import { DataSource } from 'typeorm';
import { Festival } from '../modules/festival/festival.entity';
import { festivals } from './data/festival.info';

export async function seedFestivals(dataSource: DataSource) {
  const festivalRepo = dataSource.getRepository(Festival);

  for (const festival of festivals) {
    const exists = await festivalRepo.findOne({
      where: { name: festival.name },
    });
    if (!exists) {
      await festivalRepo.save(festival);
    }
  }

  console.log('festival 데이터 삽입 완료');
}
