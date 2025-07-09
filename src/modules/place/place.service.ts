import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Region, TourSpot, FoodSpot } from './place.entity';

@Injectable()
export class PlaceService {
  constructor(
    @InjectRepository(Region)
    private readonly regionRepository: Repository<Region>,
    @InjectRepository(TourSpot)
    private readonly tourSpotRepository: Repository<TourSpot>,
    @InjectRepository(FoodSpot)
    private readonly foodSpotRepository: Repository<FoodSpot>,
  ) {}

  // 지역 검색 시 테마 목록 제공
  async getThemesByRegion(
    regionName: string,
  ): Promise<{ theme: string; count: number }[]> {
    const region = await this.regionRepository.findOne({
      where: { name: regionName },
    });

    if (!region) {
      throw new NotFoundException(`Region "${regionName}" not found`);
    }

    const [tourCount, foodCount] = await Promise.all([
      this.tourSpotRepository.count({ where: { region_id: region.id } }),
      this.foodSpotRepository.count({ where: { region_id: region.id } }),
    ]);

    const result: { theme: string; count: number }[] = [];
    if (tourCount > 0) {
      result.push({ theme: 'tour', count: tourCount });
    }
    if (foodCount > 0) {
      result.push({ theme: 'food', count: foodCount });
    }
    if (result.length === 0) {
      throw new NotFoundException(`No themes found for region "${regionName}"`);
    }
    return result;
  }

  // 테마 기반 지역 추천
  async getRandomPlaceByTheme(theme: string): Promise<TourSpot | FoodSpot> {
    const validThemes = ['tour', 'food', 'history', 'healing', 'activity'];
    if (!validThemes.includes(theme)) {
      throw new BadRequestException(`Invalid theme: ${theme}`);
    }

    let places: TourSpot[] | FoodSpot[] = [];

    if (theme === 'food') {
      // Food_spot에는 theme 필드가 없기 때문에 전체 목록 가져오기
      places = await this.foodSpotRepository.find();
    } else {
      // Tour_spot에는 theme 필드가 있으므로 해당 테마로 필터링
      places = await this.tourSpotRepository.find({
        where: {
          theme: theme as 'tour' | 'food' | 'history' | 'healing' | 'activity',
        },
      });
    }

    if (places.length === 0) {
      throw new NotFoundException(`No places found for theme "${theme}"`);
    }
    const randomIndex = Math.floor(Math.random() * places.length);
    return places[randomIndex];
  }

  // 테마와 지역에 따른 장소 검색
  // theme: 'tour' or 'food'
  async getPlacesByThemeAndRegion(
    theme: string,
    regionName: string,
  ): Promise<(TourSpot | FoodSpot)[]> {
    const region = await this.regionRepository.findOne({
      where: { name: regionName },
    });

    if (!region)
      throw new NotFoundException(`Region "${regionName}" not found`);

    if (theme === 'tour') {
      return this.tourSpotRepository.find({
        where: { region_id: region.id },
      });
    } else if (theme === 'food') {
      return this.foodSpotRepository.find({
        where: { region_id: region.id },
      });
    } else {
      throw new BadRequestException(`Invalid theme: ${theme}`);
    }
  }

  async getPlaceDetail(regionName: string, theme: string, id: string) {
    const region = await this.regionRepository.findOne({
      where: { name: regionName },
    });
    if (!region)
      throw new NotFoundException(`Region "${regionName}" not found`);

    if (theme === 'tour') {
      const place = await this.tourSpotRepository.findOne({
        where: { id, region_id: region.id },
      });
      if (!place)
        throw new NotFoundException(`Tour spot with id ${id} not found`);
      return place;
    } else if (theme === 'food') {
      const place = await this.foodSpotRepository.findOne({
        where: { id, region_id: region.id },
      });
      if (!place)
        throw new NotFoundException(`Food spot with id ${id} not found`);
      return place;
    } else {
      throw new BadRequestException(`Invalid theme: ${theme}`);
    }
  }
}
