import { Festival } from './festival.entity';
import { FestivalController } from './festival.controller';
import { FestivalService } from './festival.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Festival])],
  controllers: [FestivalController],
  providers: [FestivalService],
  exports: [],
})
export class FestivalModule {}
