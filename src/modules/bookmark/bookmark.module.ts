import { Bookmark } from './bookmark.entity';
import { BookmarkController } from './bookmark.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Bookmark])],
  controllers: [BookmarkController],
  providers: [],
  exports: [],
})
export class BookmarkModule {}
