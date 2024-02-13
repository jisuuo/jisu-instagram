import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { ProviderEnum } from './entities/provider.enum';
import { CreateSocialUserDto } from './dto/create-social-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // 유저 생성
  async createUser(createUserDto: CreateUserDto) {
    // 1) nickname 중복이 없는지 확인
    // exist() -> 만약에 조건에 해당되는 값이 있으면 true 반환
    const nicknameExists = await this.userRepository.exists({
      where: {
        nickname: createUserDto.nickname,
      },
    });

    if (nicknameExists) {
      throw new BadRequestException('이미 존재하는 닉네임입니다!');
    }

    const emailExists = await this.userRepository.exists({
      where: {
        nickname: createUserDto.email,
      },
    });

    if (emailExists) {
      throw new BadRequestException('이미 존재하는 이메일입니다!');
    }

    const newUser = this.userRepository.create({
      ...createUserDto,
      provider: ProviderEnum.LOCAL,
    });
    await this.userRepository.save(newUser);
    return newUser;
  }

  async createSocialUser(socialUserDto: CreateSocialUserDto) {
    const newUser = await this.userRepository.create(socialUserDto);
    await this.userRepository.save(newUser);
    return newUser;
  }

  // 유저 이메일 유무 확인
  async validateEmail(email: string) {
    const existUser = await this.userRepository.findOneBy({ email });
    if (!existUser) {
      throw new NotFoundException('해당되는 유저 없습니다.');
    }
    return existUser;
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

  async getUserByEmail(email: string) {
    return await this.userRepository.findOne({
      where: {
        email,
      },
    });
  }

  async getUserById(userId: string) {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (user) return user;
    throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  }
}
