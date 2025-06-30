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


}
