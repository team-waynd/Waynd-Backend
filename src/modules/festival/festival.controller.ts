import { Controller, Get, Param } from '@nestjs/common';

import { FestivalService } from './festival.service';

@Controller('festival')
export class FestivalController {
  constructor(private readonly festivalService: FestivalService) {}
  @Get()
  getAllFestivals() {
    return this.festivalService.getAllFestivals();
  }
}
