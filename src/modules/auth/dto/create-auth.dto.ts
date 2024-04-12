import { IsNotEmpty,  IsString, Matches } from "class-validator";

export class CreateAuthDto {
    
    @IsString()
    @IsNotEmpty({
        message: 'email is required'
    })
    @Matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, {
        message: 'email is not valid'
    })
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

  
}
