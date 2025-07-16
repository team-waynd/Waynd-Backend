import { FoodSpot, Region, TourSpot } from './place.entity';

import { Module } from '@nestjs/common';
import { PlaceController } from './place.controller';
import { PlaceService } from './place.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Region, TourSpot, FoodSpot])],
  controllers: [PlaceController],
  providers: [PlaceService],
})
export class PlaceModule {}
