import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import AuthUserDto from './dto/authUser.dto';
import ResponseUserAuthInterface from './interfaces/responseUserAuth.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  auth(@Body() userData: AuthUserDto): ResponseUserAuthInterface {
    return this.authService.authenticateUser(userData);
  }
}
