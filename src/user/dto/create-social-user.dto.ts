import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ProviderEnum } from '../entities/provider.enum';

export class CreateSocialUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @MinLength(7)
  @IsString()
  @ApiProperty()
  password?: string;

  @IsString()
  @ApiProperty()
  provider?: ProviderEnum = ProviderEnum.LOCAL;

  @ApiProperty()
  profileImg?: string;
}
