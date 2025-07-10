import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Festival } from './festival.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FestivalService {
  constructor(
    @InjectRepository(Festival)
    readonly festivalRepository: Repository<Festival>,
  ) {}

  async getAllFestivals(): Promise<Festival[]> {
    return this.festivalRepository.find({
      order: {
        start_date: 'ASC',
      },
    });
  }
}
