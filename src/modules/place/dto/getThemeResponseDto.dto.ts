import { ApiProperty } from '@nestjs/swagger';

export class getThemeResponseDto {
  @ApiProperty({ example: 'https://example.com/image.jpg' })
  thumbnail: string;

  @ApiProperty({ example: 'food' })
  theme: 'tour' | 'food' | 'history' | 'activity' | 'healing';

  constructor(partial: Partial<getThemeResponseDto>) {
    Object.assign(this, partial);
  }
}
