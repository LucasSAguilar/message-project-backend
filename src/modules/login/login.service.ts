import { Injectable } from '@nestjs/common';
import LoginUserDto from './dto/loginUser.dto';
import * as jwt from 'jsonwebtoken';
import responseUserLoginDto from './interfaces/responseUserLogin.interface';
import varifyLoginUserInterface from './interfaces/userLoggend.interface';

@Injectable()
export class LoginService {
  authenticateUser(userData: LoginUserDto): responseUserLoginDto {
    const generated_token = jwt.sign(userData, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    return {
      ...userData,
      token: generated_token,
    };
  }

  verifyToken(token: string): varifyLoginUserInterface {
    try {
      jwt.verify(token, process.env.JWT_SECRET);
      return {
        isLoggend: true,
        message: 'Token is valid',
      };
    } catch (error) {
      return {
        isLoggend: false,
        message: 'Token is invalid: ' + error.message,
      };
    }
  }
}
