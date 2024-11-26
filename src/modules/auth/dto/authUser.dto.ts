import { IsString, MinLength } from "class-validator";

export default class AuthUserDto {
    
    @IsString()
    @MinLength(4)
    name: string;

    @IsString()
    role: string;
}