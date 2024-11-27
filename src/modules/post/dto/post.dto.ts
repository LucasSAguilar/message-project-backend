import { Transform } from "class-transformer";
import { IsISO8601, IsString, MaxLength, MinLength } from "class-validator";

export default class PostDto {
    id?: number;

    @IsString()
    name: string;

    @IsString()
    role: string;
    
    @IsString()
    @MinLength(1)
    @MaxLength(150)
    content: string;

    @IsISO8601()
    @Transform(({ value }) => new Date(value), { toClassOnly: true })
    createdAt: Date;
}