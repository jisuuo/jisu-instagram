import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import * as bcrypt from 'bcryptjs';
import { User } from '@user/entities/user.entity';
import { CreateUserDto } from '@user/dto/create-user.dto';
import { ProviderEnum } from '@user/entities/provider.enum';
import { CreateSocialUserDto } from '@user/dto/create-social-user.dto';

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

  // 유저 찾기
  async getUserByEmail(email: string) {
    return await this.userRepository.findOne({
      where: {
        email,
      },
    });
  }

  // 유저 찾기
  async findUserByEmail(email: string) {
    const user = await this.userRepository.findOneBy({ email });
    if (user) return user;
    throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  }

  async findUserByNickname(nickname: string) {
    const user = await this.userRepository.findOneBy({ nickname });
    if (user) return user.email;
    throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  }

  async findUserByPhone(phone: string) {
    const user = await this.userRepository.findOneBy({ phone });
    if (user) return user.email;
    throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  }

  async findUserForPasswordReset(userInfo: string) {
    const emailUser = await this.findUserByEmail(userInfo);
    console.log(emailUser);
    if (!emailUser) {
      const phoneUser = await this.findUserByPhone(userInfo);
      if (!phoneUser) {
        throw new NotFoundException('등록된 유저가 없습니다!');
      }
      return phoneUser;
    }
    return emailUser.email;
  }

  // 비밀번호 변경
  async changePassword(userId: string, confirmPassword: string) {
    const user = await this.userRepository.findOneBy({ id: userId });

    const saltValue = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(confirmPassword, saltValue);

    await this.userRepository.update(
      { id: userId },
      { password: user.password },
    );
    const updateUser = await this.userRepository.findOneBy({ id: userId });
    return updateUser;
  }

  async changePasswordByEmail(email: string, confirmPassword: string) {
    const user = await this.userRepository.findOneBy({ email });

    const saltValue = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(confirmPassword, saltValue);

    await this.userRepository.update({ email }, { password: user.password });
    const updateUser = await this.userRepository.findOneBy({ email });
    return updateUser;
  }

  // 유저 ID로 찾기
  async getUserById(userId: string) {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (user) return user;
    throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  }

  // 본인 인증 처리
  async markIsVerify(email: string) {
    const user = await this.findUserByEmail(email);
    if (!user) {
      throw new NotFoundException('유저를 찾을 수 없습니다!');
    }
    await this.userRepository.update(
      { email },
      {
        isVerified: true,
      },
    );
    return user;
  }

  // 프로필 이미지 수정
  async updateProfileImg(userId: string, profileImg: string) {
    return await this.userRepository.update(
      {
        id: userId,
      },
      {
        profileImg,
      },
    );
  }

  // 프로필 비밀번호, 닉네임, 이미지 수정
  async updateProfile(
    id: string,
    password?: string,
    nickname?: string,
    profileImg?: string,
  ) {
    const user = await this.getUserById(id);

    if (!user) {
      throw new NotFoundException('유저가 없습니다!');
    }

    if (password) {
      user.password = await user.hashPassword(password);
    }

    if (nickname) {
      user.nickname = nickname;
    }

    if (profileImg) {
      user.profileImg = profileImg;
    }

    const newUser = await this.userRepository.save(user);
    return newUser;
  }
}
