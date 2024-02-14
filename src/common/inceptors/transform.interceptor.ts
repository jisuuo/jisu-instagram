import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// export const Info = {
//   statusCode: 200,
//   message: 'success',
// };

export function createInfo(statusCode: number = 200) {
  return {
    statusCode,
    message: 'success',
  };
}

export type Response<T> = ReturnType<typeof createInfo> & {
  data: T;
};

// 성공시 던져주는 msg 형식
// export type Response<T> = typeof Info & {
//   data: T;
// };

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<Text, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const res = context.switchToHttp().getResponse();
    const status = res.statusCode;
    return next
      .handle()
      .pipe(map((data) => Object.assign({}, createInfo(status), { data })));
  }
}
