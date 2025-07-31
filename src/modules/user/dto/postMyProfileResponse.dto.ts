import { ApiProperty } from '@nestjs/swagger';

export class PostMyProfileResponseDto {
  @ApiProperty({
    example: null,
    type: Object,
    nullable: true,
    description: '수정 결과 데이터 (없음)',
  })
  data: null;
}
