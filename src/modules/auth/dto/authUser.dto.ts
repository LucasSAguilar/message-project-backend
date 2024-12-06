import { IsString, MinLength, IsNotEmpty } from 'class-validator';

export default class AuthUserDto {
  
  @IsString()
  @MinLength(4, { message: 'Nome deve conter no mínimo 4 caracteres' })
  @IsNotEmpty({ message: 'Nome não pode ser vazio' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Função não pode estar vazio' })
  role: string;
}
