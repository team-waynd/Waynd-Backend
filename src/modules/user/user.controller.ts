import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards/auth.guard';
import { User } from './user.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetMyProfileResponseDto } from './dto/getMyProfileResponse.dto';
import { PostMyProfileResponseDto } from './dto/postMyProfileResponse.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  @ApiOperation({ summary: '내 정보 조회' })
  @ApiResponse({
    status: 200,
    type: () => GetMyProfileResponseDto,
    description: '내 정보를 조회합니다.',
  })
  async getMyProfile(@Req() req: { user: User }) {
    const userId = req.user.id;
    const userInfo = await this.userService.findById(userId);
    return new GetMyProfileResponseDto({
      userId: userInfo?.id,
      name: userInfo?.name,
      email: userInfo?.email,
      profileImg: userInfo?.profileImage,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post('me')
  @ApiOperation({ summary: '내 정보 수정' })
  @ApiResponse({
    status: 200,
    type: () => PostMyProfileResponseDto,
    description: '내 정보를 수정합니다.',
  })
  async editMyProfile(
    @Req() req: { user: User },
    @Body() body: { name: string; email: string },
  ) {
    const userId = req.user.id;

    if (!userId) {
      throw new Error('User ID not found in request');
    }

    await this.userService.updateProfile({
      userId,
      name: body.name,
      email: body.email,
    });

    return { data: null };
  }
}
