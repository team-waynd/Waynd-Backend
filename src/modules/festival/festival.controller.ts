import { Controller, Get, Param } from '@nestjs/common';

import { FestivalService } from './festival.service';

@Controller('festival')
export class FestivalController {
  constructor(private readonly festivalService: FestivalService) {}
  @Get()
  getAllFestivals() {
    return this.festivalService.getAllFestivals();
  }

  @Get('/region/:regionName')
  getFestivalsByRegion(@Param('regionName') regionName: string) {
    return this.festivalService.getFestivalsByRegion(regionName);
  }

  @Get('/:id')
  getFestivalById(@Param('id') id: string) {
    return this.festivalService.getFestivalById(id);
  }
}
