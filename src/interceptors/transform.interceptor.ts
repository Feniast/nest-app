import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseCode } from 'src/common/constants/response-code';
import { classToPlain } from 'class-transformer';

export interface Response {
  code: number;
  data: any;
  success: boolean;
}

@Injectable()
export class TransformInterceptor
  implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response> {
    return next
      .handle()
      .pipe(
        map(data => ({
          code: ResponseCode.SUCCESS,
          data: classToPlain(data),
          success: true,
        })),
      );
  }
}
