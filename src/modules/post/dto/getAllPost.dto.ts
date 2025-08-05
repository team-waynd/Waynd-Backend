import { ApiProperty } from '@nestjs/swagger';

export class GetAllPostDto {
  @ApiProperty({ example: 'id' })
  id: string;

  @ApiProperty({ example: 'user_id' })
  user_id: string;

  @ApiProperty({ example: 2 })
  targetRegionId: number;

  @ApiProperty({ example: '제목' })
  title: string;

  @ApiProperty({ example: 'content' })
  content: string;

  @ApiProperty({ example: 3.5 })
  rating: number;

  @ApiProperty({ example: '2024-05-04' })
  created_at: Date;

  updated_at: Date | null;

  @ApiProperty({ example: 5 })
  likes: number;
}
