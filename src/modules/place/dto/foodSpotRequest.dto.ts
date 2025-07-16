import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateFoodSpotDto {
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

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsNumber()
  rating: number;

  @IsString()
  weather: string;
}
