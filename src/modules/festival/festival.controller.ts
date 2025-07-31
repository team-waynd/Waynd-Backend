import { Controller, Get, Param } from '@nestjs/common';

import { FestivalService } from './festival.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetAllFestivalsResponseDto } from './dto/getAllFestivalsResponse.dto';

@ApiTags('Festival')
@Controller('festival')
export class FestivalController {
  constructor(private readonly festivalService: FestivalService) {}
  @Get()
  @ApiOperation({ summary: '모든 축제 목록 조회' })
  @ApiResponse({
    status: 200,
    type: GetAllFestivalsResponseDto,
    isArray: true,
    description: '성공적으로 모든 기업 리스트를 반환합니다.',
  })
  getAllFestivals() {
    return this.festivalService.getAllFestivals();
  }

  @Get('/region/:regionName')
  @ApiOperation({ summary: '지역 이름으로 축제 조회' })
  @ApiResponse({
    status: 200,
    type: GetAllFestivalsResponseDto,
    description: '성공적으로 해당 기업 정보를 반환합니다.',
  })
  getFestivalsByRegion(@Param('regionName') regionName: string) {
    return this.festivalService.getFestivalsByRegion(regionName);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'ID기반 축제 조회' })
  @ApiResponse({
    status: 200,
    description: '성공적으로 해당 ID 기업 정보를 반환합니다.',
  })
  getFestivalById(@Param('id') id: string) {
    return this.festivalService.getFestivalById(id);
  }
}
