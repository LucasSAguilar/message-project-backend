import { Injectable } from '@nestjs/common';
import AuthUserDto from './dto/authUser.dto';
import * as jwt from 'jsonwebtoken';
import responseUserAuthDto from './interfaces/responseUserAuth.interface';
import VerifyAuthUserInterface from './interfaces/verifyAuthUserInterface.interface';

@Injectable()
export class AuthService {
  authenticateUser(userData: AuthUserDto): responseUserAuthDto {
    try {
      const payload = { ...userData };
      const generated_token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      return {
        ok: true,
        ...userData,
        token: generated_token,
      };
    } catch (error) {
      throw new Error(error.message || 'Erro ao gerar token de autenticação');
    }
  }

  verifyToken(token: string): VerifyAuthUserInterface {
    try {
      jwt.verify(token, process.env.JWT_SECRET);
      return {
        success: true,
        message: 'Token is valid',
      };
    } catch (error) {
      return {
        success: false,
        message: 'Token is invalid: ' + error.message,
      };
    }
  }
}
