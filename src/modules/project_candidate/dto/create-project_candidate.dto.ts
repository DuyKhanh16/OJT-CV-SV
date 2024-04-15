import { IsNotEmpty, IsString } from "class-validator";

export class CreateProjectCandidateDto {

    @IsNotEmpty()
    @IsString()
    candidate_id:string|any;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    link: string;

    @IsNotEmpty()
    @IsString()
    info: string;

    @IsNotEmpty()
    @IsString()
    start_at: string;

    @IsNotEmpty()
    @IsString()
    end_at: string;
}
