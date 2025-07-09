import { Module } from '@nestjs/common';
import { PlaceController } from './place.controller';
import { PlaceService } from './place.service';
import { Region, Tour_spot, Food_spot } from './place.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Region, Tour_spot, Food_spot])],
  controllers: [PlaceController],
  providers: [PlaceService],
})
export class PlaceModule {}
