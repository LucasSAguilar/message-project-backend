import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';

export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const authHeader = request.headers['authorization'];
    if (!authHeader) {
      throw new HttpException(
        {
          ok: false,
          message: 'Não foi possível confirmar sua autorização',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    const token = authHeader.split(' ')[1];

    try {
      jwt.verify(token, process.env.JWT_SECRET);
      return true;
    } catch (error) {
      throw new HttpException(
        { ok: false, message: 'Token inválido ou expirado' },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
