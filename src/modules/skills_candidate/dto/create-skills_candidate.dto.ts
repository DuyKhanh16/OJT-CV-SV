import { IsNotEmpty, IsString } from "class-validator";

export class CreateSkillsCandidateDto {

    @IsNotEmpty()
    @IsString()
    candidate_id: string|any;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    leveljob_id: string|any;
}
