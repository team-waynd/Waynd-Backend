import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { PlaceService } from './place.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Places')
@Controller('places')
export class PlaceController {
  constructor(private readonly placeService: PlaceService) {}

  // 지역 검색 시: 해당 지역의 테마 목록 (맛집/관광 등)
  @Get()
  @ApiOperation({ summary: '지역 기반 테마 검색' })
  @ApiResponse({
    status: 200,
    // type: string,
    description: '해당 지역과 연결된 테마 목록을 반환합니다.',
  })
  getThemesByRegion(@Query('region') region: string) {
    if (!region) {
      throw new BadRequestException('Query parameter "region" is required.');
    }
    return this.placeService.getThemesByRegion(region.toLowerCase());
  }

  // 테마 선택 시 : 해당 테마에 속하는 지역 목록
  @Get('/themes/:theme/random')
  @ApiOperation({ summary: '테마 기반 지역 검색' })
  @ApiResponse({
    status: 200,
    // type: GetAllFestivalsResponseDto,
    description: '성공적으로 모든 지역 리스트를 반환합니다.',
  })
  getRandomPlaceByTheme(@Param('theme') theme: string) {
    return this.placeService.getRandomPlaceByTheme(theme.toLowerCase());
  }

  // 테마와 지역 선택 시 : 해당 테마와 지역에 속하는 장소 목록
  @Get('/regions/:region/:theme')
  @ApiOperation({ summary: '테마 및 지역 기반 장소 검색' })
  @ApiResponse({
    status: 200,
    // type: GetAllFestivalsResponseDto,
    description: '성공적으로 모든 장소 리스트를 반환합니다.',
  })
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

  // 장소 상세 조회
  @Get('/:region/:theme/:id')
  @ApiOperation({ summary: '장소 상세 검색' })
  @ApiResponse({
    status: 200,
    // type: GetAllFestivalsResponseDto,
    description: '성공적으로 해당 장소 상세정보를 반환합니다.',
  })
  getPlaceDetail(
    @Param('region') region: string,
    @Param('theme') theme: string,
    @Param('id') id: string,
  ) {
    if (!region || !theme || !id) {
      throw new BadRequestException(
        'Parameters "region", "theme", and "id" are required.',
      );
    }
    return this.placeService.getPlaceDetail(region, theme, id);
  }
}
