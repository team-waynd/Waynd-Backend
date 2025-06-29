import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity'; // 실제 경로에 맞게 수정

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findByEmailOrSave(
    email: string,
    name: string,
    providerId: string,
    provider: 'kakao' | 'google',
    profileImage: string,
  ): Promise<User> {
    const existingUser = await this.findByEmail(email);
    if (existingUser) return existingUser;

    const newUser = this.userRepository.create({
      email,
      name,
      provider,
      providerId,
      profileImage,
    });

    return this.userRepository.save(newUser);
  }

  async findById(id: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async updateRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<void> {
    await this.userRepository.update(userId, { refreshToken });
  }
}
