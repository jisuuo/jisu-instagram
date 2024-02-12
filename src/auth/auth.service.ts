import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { ProviderEnum } from '../user/entities/provider.enum';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  // 유저 가입
  async createUser(createUserDto: CreateUserDto) {
    return await this.userService.createUser({
      ...createUserDto,
      provider: ProviderEnum.LOCAL,
    });
  }

  // 유저 프로필 가져오기 [1명, by userId]
  async getUser(userId: string) {
    return await this.userService.getUser(userId);
  }
}
