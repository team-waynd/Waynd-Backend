import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateFoodSpotDto {
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

  @IsNumber()
  region_id: number;
}
