import { IsNotEmpty, IsString } from "class-validator";

export class CreateTypecompanyDto {

    @IsString()
    @IsNotEmpty()
    name: string
}
