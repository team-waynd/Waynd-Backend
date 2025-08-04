import { Controller, Get, Post, Req, Param, UseGuards } from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { JwtAuthGuard } from '../auth/guards/auth.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetBookmarkFestivalsResponseDto } from './dto/getBookmarkFestivalsResponse.dto';
import { PostBookmarkFestivalResponseDto } from './dto/postBookmarkFestivalResponse.dto';
import { GetBookmarkSpotsResponseDto } from './dto/getBookmarkSpotsResponse.dto';
import { GetBookmarkRestaurantsResponseDto } from './dto/getBookmarkRestaurantsResponse.dto';
import { PostBookmarkSpotResponseDto } from './dto/postBookmarkSpotResponse.dto';
import { PostBookmarkRestaurantResponseDto } from './dto/postBookmarkRestaurantResponse.dto';
import { User } from '../user/user.entity';

interface AuthenticatedRequest extends Request {
  user: User;
}

@ApiTags('Bookmark')
@Controller('bookmark')
@UseGuards(JwtAuthGuard)
export class BookmarkController {
  constructor(private readonly bookmarkService: BookmarkService) {}

  @Get('festival')
  @ApiOperation({ summary: '찜 축제 목록 조회' })
  @ApiResponse({
    status: 200,
    type: GetBookmarkFestivalsResponseDto,
    isArray: true,
    description: '찜한 축제 목록을 반환합니다.',
  })
  getBookmarkFestivals(@Req() req: AuthenticatedRequest) {
    const userId = req.user.id;
    return this.bookmarkService.getBookmarkFestivals(userId);
  }

  @Post('festival/toggle/:id')
  @ApiOperation({ summary: '찜 축제 토글' })
  @ApiResponse({
    status: 200,
    type: PostBookmarkFestivalResponseDto,
    description: '축제를 찜하거나 해제합니다.',
  })
  toggleBookmarkFestival(
    @Req() req: AuthenticatedRequest,
    @Param('id') festivalId: string,
  ) {
    const userId = req.user.id;
    return this.bookmarkService.toggleBookmarkFestival(userId, festivalId);
  }

  @Get('spot')
  @ApiOperation({ summary: '찜 장소 목록 조회' })
  @ApiResponse({
    status: 200,
    type: GetBookmarkSpotsResponseDto,
    isArray: true,
    description: '찜한 장소 목록을 조회합니다.',
  })
  getBookmarkSpots(@Req() req: AuthenticatedRequest) {
    const userId = req.user.id;
    return this.bookmarkService.getBookmarkSpots(userId);
  }

  @Post('spot/toggle/:id')
  @ApiOperation({ summary: '찜 장소 토글' })
  @ApiResponse({
    status: 200,
    type: PostBookmarkSpotResponseDto,
    description: '장소를 찜하거나 해제합니다.',
  })
  toggleBookmarkSpot(
    @Req() req: AuthenticatedRequest,
    @Param('id') spotId: string,
  ) {
    const userId = req.user.id;
    return this.bookmarkService.toggleBookmarkSpot(userId, spotId);
  }

  @Get('food')
  @ApiOperation({ summary: '찜 음식점 목록 조회' })
  @ApiResponse({
    status: 200,
    type: GetBookmarkRestaurantsResponseDto,
    isArray: true,
    description: '찜한 음식점 목록을 조회합니다.',
  })
  getBookmarkRestaurants(@Req() req: AuthenticatedRequest) {
    const userId = req.user.id;
    return this.bookmarkService.getBookmarkRestaurants(userId);
  }

  @Post('food/toggle/:id')
  @ApiOperation({ summary: '찜 음식점 토글' })
  @ApiResponse({
    status: 200,
    type: PostBookmarkRestaurantResponseDto,
    description: '음식점을 찜하거나 해제합니다.',
  })
  toggleBookmarkRestaurant(
    @Req() req: AuthenticatedRequest,
    @Param('id') restaurantId: string,
  ) {
    const userId = req.user.id;
    return this.bookmarkService.toggleBookmarkRestaurant(userId, restaurantId);
  }
}
