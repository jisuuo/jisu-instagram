import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProviderEnum } from '../../user/entities/provider.enum';

@Injectable()
export class GoogleUserGuard extends AuthGuard(ProviderEnum.GOOGLE) {}
