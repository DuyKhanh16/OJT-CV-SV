import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsNumber, IsString, Matches } from "class-validator";

export class CreateCandidateAuthDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail({},{message:"sai định dạng email"})
    email: string;

    @IsString()
    @IsNotEmpty()
    @Matches(/^[a-zA-Z0-9]*$/, {
        message: 'chỉ có thể chứa chữ cái và số.',
      })
      @Transform(({ value }) => value.replace(/[^\w]/g, ''))
    password: string;

   
}
