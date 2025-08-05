import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({ example: 'id' })
  @IsString()
  user_id: string;

  @IsNumber()
  @ApiProperty({ example: 3 })
  targetRegionId: number;

  @IsString()
  @ApiProperty({ example: '경북 구미시 여행 후기' })
  title: string;

  @IsString()
  @ApiProperty({
    example: '생각보다 뭐가 더 없어서 관광하기에는 정말 별로에요.',
  })
  content: string;

  @IsNumber()
  @ApiProperty({ example: 2.0 })
  rating: number;

  @IsArray()
  @ApiProperty({ example: 'img_url' })
  @IsNotEmpty()
  @IsString({ each: true })
  image_urls: string[];

  @IsArray()
  @IsNotEmpty()
  @ApiProperty({ example: [1, 5] })
  @IsNumber({}, { each: true })
  tag_ids: number[];
}
