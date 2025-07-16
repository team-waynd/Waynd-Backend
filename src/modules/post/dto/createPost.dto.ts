import { IsString, IsNumber, IsArray, IsNotEmpty } from 'class-validator';

export class CreatePostDto {
  @IsString()
  user_id: string;

  @IsNumber()
  targetRegionId: number;

  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsNumber()
  rating: number;

  @IsArray()
  @IsNotEmpty()
  @IsString({ each: true })
  image_urls: string[];

  @IsArray()
  @IsNotEmpty()
  @IsNumber({}, { each: true })
  tag_ids: number[];
}
