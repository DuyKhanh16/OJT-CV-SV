import { IsNotEmpty, IsString } from "class-validator";

export class CreateExperienceCandidateDto {
    @IsNotEmpty()
    @IsString()
    candidate_id: string|any;

    @IsNotEmpty()
    @IsString()
    position:string;

    @IsNotEmpty()
    @IsString()
    company: string;

    @IsNotEmpty()
    @IsString()
    start_at: string;

    @IsNotEmpty()
    @IsString()
    end_at: string;

    @IsNotEmpty()
    @IsString()
    info: string;
}
