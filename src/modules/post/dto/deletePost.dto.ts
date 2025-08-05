import { ApiProperty } from '@nestjs/swagger';

export class DeletePostDto {
  @ApiProperty({ example: true })
  data: boolean;
}
