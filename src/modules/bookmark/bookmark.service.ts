import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bookmark } from './bookmark.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BookmarkService {
  constructor(
    @InjectRepository(Bookmark)
    readonly bookmarkRepository: Repository<Bookmark>,
  ) {}

  async getBookmarkFestivals(userId: string) {
    return this.bookmarkRepository.find({
      where: {
        user: { id: userId },
        type: 'festival',
      },
    });
  }

  async getBookmarkSpots(userId: string) {
    return this.bookmarkRepository.find({
      where: {
        user: { id: userId },
        type: 'spot',
      },
    });
  }

  async getBookmarkRestaurants(userId: string) {
    return this.bookmarkRepository.find({
      where: {
        user: { id: userId },
        type: 'food',
      },
    });
  }

  async toggleBookmark(
    userId: string,
    type: 'festival' | 'spot' | 'food',
    refId: string,
  ): Promise<'added' | 'removed'> {
    const existing = await this.bookmarkRepository.findOne({
      where: { userId, type, ref: refId },
    });

    if (existing) {
      await this.bookmarkRepository.delete(existing.id);
      return 'removed';
    } else {
      const bookmark = this.bookmarkRepository.create({
        user: { id: userId },
        type,
        ref: refId,
      });
      await this.bookmarkRepository.save(bookmark);
      return 'added';
    }
  }

  async toggleBookmarkFestival(userId: string, festivalId: string) {
    return this.toggleBookmark(userId, 'festival', festivalId);
  }

  async toggleBookmarkSpot(userId: string, spotId: string) {
    return this.toggleBookmark(userId, 'spot', spotId);
  }

  async toggleBookmarkRestaurant(userId: string, restaurantId: string) {
    return this.toggleBookmark(userId, 'food', restaurantId);
  }
}
