import { Controller, Get, Post, Req, Param, UseGuards } from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { JwtAuthGuard } from '../auth/guards/auth.guard';

@Controller('bookmark')
@UseGuards(JwtAuthGuard)
export class BookmarkController {
  constructor(private readonly bookmarkService: BookmarkService) {}

  @Get('festival')
  getBookmarkFestivals(@Req() req) {
    const userId = req.user.id as string;
    return this.bookmarkService.getBookmarkFestivals(userId);
  }

  @Post('festival/:id/toggle')
  toggleBookmarkFestival(@Req() req, @Param('id') festivalId: string) {
    const userId = req.user.id as string;
    return this.bookmarkService.toggleBookmarkFestival(userId, festivalId);
  }

  @Get('spot')
  getBookmarkSpots(@Req() req) {
    const userId = req.user.id as string;
    return this.bookmarkService.getBookmarkSpots(userId);
  }

  @Post('spot/:id/toggle')
  toggleBookmarkSpot(@Req() req, @Param('id') spotId: string) {
    const userId = req.user.id as string;
    return this.bookmarkService.toggleBookmarkSpot(userId, spotId);
  }

  @Get('food')
  getBookmarkRestaurants(@Req() req) {
    const userId = req.user.id as string;
    return this.bookmarkService.getBookmarkRestaurants(userId);
  }

  @Post('food/:id/toggle')
  toggleBookmarkRestaurant(@Req() req, @Param('id') restaurantId: string) {
    const userId = req.user.id as string;
    return this.bookmarkService.toggleBookmarkRestaurant(userId, restaurantId);
  }
}
