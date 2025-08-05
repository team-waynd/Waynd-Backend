import { ApiProperty } from '@nestjs/swagger';

export class getPlaceDetailResponseDto {
  @ApiProperty({ example: 1 })
  region_id: number;

  @ApiProperty({ example: '오복돼지국밥 해운대점' })
  name: string;

  @ApiProperty({ example: '돼지국밥' })
  hashtag: string;

  @ApiProperty({ example: '부산 해운대에 위치한 유명한 맛집입니다.' })
  description: string;

  @ApiProperty({ example: 'https://example.com/image.jpg' })
  thumbnail: string;

  @ApiProperty({ example: '한식' })
  category: string;

  @ApiProperty({ example: 4.5 })
  rating: number;

  @ApiProperty({ example: 'summer' })
  season: string;

  @ApiProperty({ example: '부산광역시 해운대구 구남로 15' })
  location: string;

    constructor(partial: Partial<getPlaceDetailResponseDto>) {
    Object.assign(this, partial);
  }
}
