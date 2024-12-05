import {
  Body,
  Controller,
  Post,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import AuthUserDto from './dto/authUser.dto';
import ResponseUserAuthInterface from './interfaces/responseUserAuth.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
   auth(@Body() userData: AuthUserDto): ResponseUserAuthInterface {
    try {
      // Chama o serviço para autenticar o usuário
      return this.authService.authenticateUser(userData);
    } catch (error) {
      // Caso ocorra um erro de autenticação, retorna uma resposta adequada
      throw new HttpException(
        {
          ok: false,
          error: error.message || 'Erro ao autenticar usuário',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
