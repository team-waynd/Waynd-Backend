import { ApiProperty } from '@nestjs/swagger';

export class PostBookmarkFestivalResponseDto {
  @ApiProperty({ example: 'true' })
  success: boolean;
  @ApiProperty({ type: 'null', nullable: true })
  data: null;
}
