import { ApiProperty } from '@nestjs/swagger';

export class GetAllFestivalsResponseDto {
  @ApiProperty({ example: '3d7d82de-72d7-4b3f-b343-75f7cfbcb1aa' })
  id: string;

  @ApiProperty({ example: '부산 불꽃축제' })
  name: string;

  @ApiProperty({ example: '부산광역시' })
  regionName: string;

  @ApiProperty({ example: '2025-10-01' })
  startDate: string;

  @ApiProperty({ example: '2025-10-03' })
  endDate: string;

  @ApiProperty({ example: '불꽃놀이' })
  theme: string;

  @ApiProperty({ example: 'https://example.com/image.jpg' })
  thumbnail: string;

  @ApiProperty({ example: '부산 광안리에서 열리는 화려한 불꽃축제입니다.' })
  description: string;
}
