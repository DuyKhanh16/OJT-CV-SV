import { IsNotEmpty, IsString } from "class-validator";

export class CreateEducationCandidateDto {
    @IsNotEmpty()
    @IsString()
    candidate_id:string

    @IsNotEmpty()
    @IsString()
    name_education:string

    @IsNotEmpty()
    @IsString()
    major:string

    @IsNotEmpty()
    @IsString()
    started_at:string

    @IsNotEmpty()
    @IsString()
    end_at:string

    @IsNotEmpty()
    @IsString()
    info:string
}
