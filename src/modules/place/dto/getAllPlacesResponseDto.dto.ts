import { ApiProperty } from '@nestjs/swagger';
export class getAllPlacesResponseDto {
  @ApiProperty({ example: 1 })
  region_id: number;

  @ApiProperty({ example: '부산' })
  regionName: string;

  @ApiProperty({ example: '부산 해운대 국밥집' })
  name: string;

  @ApiProperty({ example: 'https://example.com/image.jpg' })
  thumbnail: string;

  @ApiProperty({ example: '돼지국밥' })
  hashtag: string;

  @ApiProperty({ example: '부산 해운대 최고 맛집입니다.' })
  description: string;

    constructor(partial: Partial<getAllPlacesResponseDto>) {
    Object.assign(this, partial);
  }
}
