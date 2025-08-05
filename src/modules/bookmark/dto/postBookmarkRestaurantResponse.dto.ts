import { ApiProperty } from '@nestjs/swagger';

export class PostBookmarkRestaurantResponseDto {
  @ApiProperty({ example: 'true' })
  success: boolean;
  @ApiProperty({ type: 'null', nullable: true })
  data: null;
}
