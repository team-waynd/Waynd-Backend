import { Bookmark } from './bookmark.entity';
import { BookmarkController } from './bookmark.controller';
import { BookmarkService } from './bookmark.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Bookmark])],
  controllers: [BookmarkController],
  providers: [BookmarkService],
  exports: [],
})
export class BookmarkModule {}
