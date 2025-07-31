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
  async getAllFestivals() {
    const response = await this.festivalService.getAllFestivals();
    return response.map(
      (f) =>
        new GetAllFestivalsResponseDto({
          id: f.id,
          name: f.name,
          regionName: f.region,
          startDate: f.start_date,
          endDate: f.end_date,
          theme: f.theme,
          thumbnail: f.thumbnail,
          description: f.description,
        }),
    );
  }

  @Get('/region/:regionName')
  @ApiOperation({ summary: '지역 이름으로 축제 조회' })
  @ApiResponse({
    status: 200,
    type: GetAllFestivalsResponseDto,
    isArray: true,
    description: '성공적으로 해당 기업 정보를 반환합니다.',
  })
  async getFestivalsByRegion(@Param('regionName') regionName: string) {
    const response =
      await this.festivalService.getFestivalsByRegion(regionName);
    return response.map(
      (f) =>
        new GetAllFestivalsResponseDto({
          id: f.id,
          name: f.name,
          regionName: f.region,
          startDate: f.start_date,
          endDate: f.end_date,
          theme: f.theme,
          thumbnail: f.thumbnail,
          description: f.description,
        }),
    );
  }

  @Get('/:id')
  @ApiOperation({ summary: 'ID기반 축제 조회' })
  @ApiResponse({
    status: 200,
    type: GetAllFestivalsResponseDto,
    description: '성공적으로 해당 ID 기업 정보를 반환합니다.',
  })
  async getFestivalById(@Param('id') id: string) {
    const response = await this.festivalService.getFestivalById(id);
    return new GetAllFestivalsResponseDto({
      id: response.id,
      name: response.name,
      regionName: response.region,
      startDate: response.start_date,
      endDate: response.end_date,
      theme: response.theme,
      thumbnail: response.thumbnail,
      description: response.description,
    });
  }
}
