import { ApiProperty } from '@nestjs/swagger';

export class PatchPostDto {
  @ApiProperty({ example: true })
  data: boolean;
}
