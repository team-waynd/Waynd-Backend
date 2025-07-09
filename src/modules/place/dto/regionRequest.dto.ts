import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateTourSpotDto {
  @IsNumber()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;
}
