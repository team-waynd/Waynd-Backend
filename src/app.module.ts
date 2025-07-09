import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
// 앞으로 여기에 실제 기능 모듈들을 import
// import { UserModule } from './modules/user/user.module';
// import { AuthModule } from './modules/auth/auth.module';
import { PlaceModule } from './modules/place/place.module';
import { PostModule } from './modules/post/post.module';

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

    // UserModule,
    // AuthModule,
    PlaceModule,
    UserModule,
    AuthModule,
    PostModule,
  ],
})
export class AppModule {}
