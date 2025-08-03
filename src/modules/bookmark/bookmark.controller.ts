import { Controller, Get, Post } from '@nestjs/common';

import { BookmarkService } from './bookmark.service';

@Controller('bookmark')
export class BookmarkController {
  constructor(private readonly bookmarkService: BookmarkService) {}

  @Get('festival')
  getBookmarkFestivals(userId: string) {
    return this.bookmarkService.getBookmarkFestivals(userId);
  }

  @Post('festival')
  toggleBookmarkFestival(userId: string, festivalId: string) {
    return this.bookmarkService.toggleBookmarkFestival(userId, festivalId);
  }

  @Get('spot')
  getBookmarkSpots(userId: string) {
    return this.bookmarkService.getBookmarkSpots(userId);
  }

  @Post('spot')
  toggleBookmarkSpot(userId: string, spotId: string) {
    return this.bookmarkService.toggleBookmarkSpot(userId, spotId);
  }

  @Get('food')
  getBookmarkRestaurants(userId: string) {
    return this.bookmarkService.getBookmarkRestaurants(userId);
  }

  @Post('food')
  toggleBookmarkRestaurant(userId: string, restaurantId: string) {
    return this.bookmarkService.toggleBookmarkRestaurant(userId, restaurantId);
  }
}
