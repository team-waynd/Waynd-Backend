import { ApiProperty } from '@nestjs/swagger';

export class PostBookmarkSpotResponseDto {
  @ApiProperty({ example: 'true' })
  success: boolean;
  @ApiProperty({ type: 'null', nullable: true })
  data: null;
}
