import { AuthModule } from './modules/auth/auth.module';
import { BookmarkModule } from './modules/bookmark/bookmark.module';
import { ConfigModule } from '@nestjs/config';
import { FestivalModule } from './modules/festival/festival.module';
import { Module } from '@nestjs/common';
import { PlaceModule } from './modules/place/place.module';
import { PostModule } from './modules/post/post.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '3306', 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,

      retryAttempts: 10,
      retryDelay: 3000,
    }),

    PlaceModule,
    UserModule,
    AuthModule,
    PostModule,
    FestivalModule,
    BookmarkModule,
  ],
})
export class AppModule {}
