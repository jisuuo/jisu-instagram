import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // 유저 생성
  async createUser(createUserDto: CreateUserDto) {
    const newUser = await this.userRepository.create(createUserDto);
    await this.userRepository.save(newUser);
    return newUser;
  }

  // 유저 프로필 가져오기 [1명, by userId]
  async getUser(userId: string) {
    const existUser = await this.userRepository.findOneBy({
      id: userId,
    });

    if (!existUser) {
      throw new NotFoundException('해당되는 유저정보가 없습니다');
    }

    return existUser;
  }
}
