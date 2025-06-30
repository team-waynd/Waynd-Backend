import { IsString, IsNotEmpty, IsEnum, IsNumber } from 'class-validator';

export class CreateTourSpotDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  thumbnail: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsEnum(['tour', 'food', 'history', 'activity', 'healing'])
  theme: 'tour' | 'food' | 'history' | 'activity' | 'healing';

  @IsNumber()
  region_id: number;
}
