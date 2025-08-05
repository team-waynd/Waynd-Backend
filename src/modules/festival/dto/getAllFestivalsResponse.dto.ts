import { ApiProperty } from '@nestjs/swagger';
import { Region } from 'src/modules/place/place.entity';

export class GetAllFestivalsResponseDto {
  @ApiProperty({ example: '3d7d82de-72d7-4b3f-b343-75f7cfbcb1aa' })
  id: string;

  @ApiProperty({ example: '부산 불꽃축제' })
  name: string;

  @ApiProperty({ example: '부산광역시' })
  regionName: Region;

  @ApiProperty({ example: '2025-10-01' })
  startDate: Date;

  @ApiProperty({ example: '2025-10-03' })
  endDate: Date;

  @ApiProperty({ example: '불꽃놀이' })
  theme: string;

  @ApiProperty({ example: 'https://example.com/image.jpg' })
  thumbnail: string;

  @ApiProperty({ example: '부산 광안리에서 열리는 화려한 불꽃축제입니다.' })
  description: string;

  constructor(partial: Partial<GetAllFestivalsResponseDto>) {
    Object.assign(this, partial);
  }
}
