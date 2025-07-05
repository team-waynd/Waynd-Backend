import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { PlaceService } from './place.service';

@Controller('places')
export class PlaceController {
  constructor(private readonly placeService: PlaceService) {}

  // 지역 검색 시: 해당 지역의 테마 목록 (맛집/관광 등)
  @Get()
  getThemesByRegion(@Query('region') region: string) {
    if (!region) {
      throw new BadRequestException('Query parameter "region" is required.');
    }
    return this.placeService.getThemesByRegion(region.toLowerCase());
  }

  // 테마 선택 시 : 해당 테마에 속하는 지역 목록
  @Get('/themes/:theme/random')
  getRandomPlaceByTheme(@Param('theme') theme: string) {
    return this.placeService.getRandomPlaceByTheme(theme.toLowerCase());
  }

  // 테마와 지역 선택 시 : 해당 테마와 지역에 속하는 장소 목록
  @Get('/regions/:region/:theme')
  getPlacesByThemeAndRegion(
    @Param('region') region: string,
    @Param('theme') theme: string,
  ) {
    if (!theme || !region) {
      throw new BadRequestException(
        'Both "theme" and "region" parameters are required.',
      );
    }
    return this.placeService.getPlacesByThemeAndRegion(
      theme.toLowerCase(),
      region.toLowerCase(),
    );
  }

  @Get('/:region/:theme/:id')
  getPlaceDetail(
    @Param('region') region: string,
    @Param('theme') theme: string,
    @Param('id') id: number,
  ) {
    if (!region || !theme || !id) {
      throw new BadRequestException(
        'Parameters "region", "theme", and "id" are required.',
      );
    }
    return this.placeService.getPlaceDetail(region, theme, id);
  }
}
