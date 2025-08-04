import { ApiProperty } from '@nestjs/swagger';

export class GetBookmarkRestaurantsResponseDto {
  @ApiProperty({ example: 'id' })
  id: string;
  @ApiProperty({ example: 'spot' })
  type: 'spot' | 'food' | 'festival';
  @ApiProperty({ example: 'refId' })
  refId: string;
  @ApiProperty({ example: 'userId' })
  userId: string;
}
