import { ApiProperty } from '@nestjs/swagger';

export class GetMyProfileResponseDto {
  @ApiProperty({ example: 'id' })
  userId: string;
  @ApiProperty({ example: '이민우' })
  name: string;
  @ApiProperty({ example: 'email@naver.com' })
  email: string;
  @ApiProperty({ example: 'imgurl' })
  profileImg: string;

  constructor(partial: Partial<GetMyProfileResponseDto>) {
    Object.assign(this, partial);
  }
}
