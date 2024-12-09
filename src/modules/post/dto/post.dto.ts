import { Transform } from "class-transformer";
import { IsISO8601, IsString, MaxLength, MinLength } from "class-validator";

export default class PostDto {
    id?: number;

    @IsString({message: "O usuário precisa ter um nome."})
    name: string;

    @IsString({message: "O usuário precisa ter uma função."})
    role: string;
    
    @IsString({message: "O conteúdo precisa ser uma texto."})
    @MinLength(1, {message: "O texto precisa ter algum conteúdo."})
    @MaxLength(150, {message: "O texto não pode ultrapassar 150 caracteres."})
    content: string;

    @IsISO8601()
    createdAt: string;
    
}