import { IsEmail, IsString } from 'class-validator';

export class updateProfileRequestDto {
  @IsString()
  userId: string;
  @IsString()
  name: string;
  @IsEmail()
  email: string;
}
