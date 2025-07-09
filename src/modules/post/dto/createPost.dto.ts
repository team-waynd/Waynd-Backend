import { IsString, IsNumber, IsArray } from 'class-validator';

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
  @IsString({ each: true })
  image_urls: string[];

  @IsArray()
  @IsNumber({}, { each: true })
  tag_ids: number[];
}
