import { DataSource } from 'typeorm';
import { Region } from 'src/modules/place/place.entity';
import { regions } from './data/region.info';

export async function seedRegions(dataSource: DataSource) {
  const regionRepo = dataSource.getRepository(Region);

  for (const region of regions) {
    const existing = await regionRepo.findOne({ where: { id: region.id } });
    if (!existing) {
      await regionRepo.save(region);
    }
  }

  console.log('region 데이터 삽입 완료');
}
