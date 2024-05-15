import { IsNotEmpty, IsString } from "class-validator";

export class CreateSkillsCandidateDto {
    candidate_id: string|any;
    name: string;
    leveljob_id: string|any;
}
