import { IsString, IsNotEmpty, IsEnum, IsNumber } from 'class-validator';

export class CreateTourSpotDto {
  @IsNumber()
  region_id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  thumbnail: string;

  @IsEnum(['tour', 'food', 'history', 'activity', 'healing'])
  theme: 'tour' | 'food' | 'history' | 'activity' | 'healing';
}
