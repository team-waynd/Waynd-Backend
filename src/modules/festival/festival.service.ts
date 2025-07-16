import { Injectable, NotFoundException } from '@nestjs/common';
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

  async getFestivalsByRegion(regionName: string): Promise<Festival[]> {
    const festivals = await this.festivalRepository.find({
      where: { region: { name: regionName } },
      relations: ['region'],
      order: {
        start_date: 'ASC',
      },
    });

    if (festivals.length === 0) {
      throw new NotFoundException(
        `No festivals found for region "${regionName}".`,
      );
    }

    return festivals;
  }

  async getFestivalById(id: string): Promise<Festival> {
    const festival = await this.festivalRepository.findOne({
      where: { id },
      relations: ['region'],
    });

    if (!festival) {
      throw new NotFoundException(`Festival with ID "${id}" not found.`);
    }

    return festival;
  }
}
