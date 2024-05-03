import {
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth/auth.service';


@Injectable()
export class AuthorGuard {
  constructor(private readonly authService: AuthService) {}
  canActivate(
    context: ExecutionContext,
    role: number,
  ): Promise<boolean> | boolean {
    console.log('context', context);
    const request = context.switchToHttp().getRequest();
    const responce = context.switchToHttp().getResponse();

    const token = request.headers.authorization;
    //  console.log("token", token);

    if (!token?.startsWith('Bearer'))
      throw new UnauthorizedException('please login');

    const newToken = token.split(' ')[1];
    //    console.log("newToken", newToken);
    const checkToken = this.authService
      .verifyAccessToken(newToken)
      .then((res) => {
        request['account'] = res;
        if (res.role !== role) {
          throw new UnauthorizedException('you are not an author');
        }
        // console.log("checkToken", res);
      });

    if (!checkToken) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    //  request["user"] = checkToken;
    return true;
  }
}
