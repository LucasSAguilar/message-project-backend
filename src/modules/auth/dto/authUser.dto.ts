import { IsString, MinLength, IsNotEmpty } from 'class-validator';

export default class AuthUserDto {
  
  @IsString()
  @MinLength(4, { message: 'name must be longer than or equal to 4 characters' })
  @IsNotEmpty({ message: 'name should not be empty' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'role should not be empty' })
  role: string;
}
