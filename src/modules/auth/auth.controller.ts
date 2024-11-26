import { Body, Controller, Get, Post, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import VerifyAuthUserInterface from './interfaces/verifyAuthUserInterface.interface';
import AuthUserDto from './dto/authUser.dto';
import ResponseUserAuthInterface from './interfaces/responseUserAuth.interface';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  @Post()
  auth(@Body() userData: AuthUserDto): ResponseUserAuthInterface {
    return this.authService.authenticateUser(userData);
  }

  @Get()
  verifyToken(
    @Headers('Authorization') token: string,
  ): VerifyAuthUserInterface {
    if (!token) {
      return {
        success: false,
        message: 'No tokens reported',
      };
    }

    token = token.split(' ')[1];
    return this.authService.verifyToken(token);
  }
}
