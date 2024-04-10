import { IsEmail, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";

export default class UserDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @MinLength(6)
    password: string;

    @IsEmail()
    email: string;

    @IsNumber()
    role: number;
}