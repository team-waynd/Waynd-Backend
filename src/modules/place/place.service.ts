import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Region, Tour_spot, Food_spot } from './place.entity';

@Injectable()
export class PlaceService {
  private readonly regions: Region[] = [
    { id: 1, name: 'seoul' },
    { id: 2, name: 'busan' },
  ];

  private readonly tourSpots: Tour_spot[] = [
    {
      id: 1,
      region_id: 1,
      name: '경복궁',
      description: '조선 시대 궁궐',
      thumbnail: 'gyeongbokgung.jpg',
      category: 'palace',
      theme: 'tour',
    },
    {
      id: 2,
      region_id: 2,
      name: '해운대 해수욕장',
      description: '부산 대표 관광지',
      thumbnail: 'haeundae.jpg',
      category: 'beach',
      theme: 'tour',
    },
  ];

  private readonly foodSpots: Food_spot[] = [
    {
      id: 1,
      region_id: 1,
      name: '을지로 골뱅이',
      description: '서울의 노포 맛집',
      thumbnail: 'food1.jpg',
      category: 'korean',
      rating: 4.7,
    },
    {
      id: 2,
      region_id: 2,
      name: '광안리 회센터',
      description: '부산의 신선한 회',
      thumbnail: 'sashimi.jpg',
      category: 'seafood',
      rating: 4.8,
    },
  ];

  // 지역 검색 시 테마 목록 제공
  getThemesByRegion(regionName: string): { theme: string; count: number }[] {
    const region = this.regions.find((r) => r.name === regionName);
    if (!region)
      throw new NotFoundException(`Region "${regionName}" not found`);

    const regionId = region.id;

    const result: { theme: string; count: number }[] = [];

    const tourCount = this.tourSpots.filter(
      (t) => t.region_id === regionId && t.theme === 'tour',
    ).length;
    if (tourCount > 0) {
      result.push({ theme: 'tour', count: tourCount });
    }

    const foodCount = this.foodSpots.filter(
      (f) => f.region_id === regionId,
    ).length;
    if (foodCount > 0) {
      result.push({ theme: 'food', count: foodCount });
    }

    return result;
  }
}
