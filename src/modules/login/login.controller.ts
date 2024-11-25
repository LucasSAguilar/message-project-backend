import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import LoginUserDto from './dto/loginUser.dto';
import responseUserLoginInterface from './interfaces/responseUserLogin.interface';
import { LoginService } from './login.service';
import varifyLoginUserInterface from './interfaces/userLoggend.interface';

@Controller('login')
export class LoginController {
  loginService: LoginService;

  constructor() {
    this.loginService = new LoginService();
  }

  @Post()
  login(@Body() userData: LoginUserDto): responseUserLoginInterface {
    return this.loginService.authenticateUser(userData);
  }

  @Get()
  verifyToken(@Query('token') token: string): varifyLoginUserInterface {
    if (!token) {
      return {
        isLoggend: false,
        message: 'No tokens reported',
      };
    }

    return this.loginService.verifyToken(token);
  }
}
