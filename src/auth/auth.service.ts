import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { ProviderEnum } from '../user/entities/provider.enum';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async createUser(createUserDto: CreateUserDto) {
    return await this.userService.createUser({
      ...createUserDto,
      provider: ProviderEnum.LOCAL,
    });
  }
}
