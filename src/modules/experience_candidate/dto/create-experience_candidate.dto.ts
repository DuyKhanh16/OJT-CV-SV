import { IsNotEmpty, IsString } from "class-validator";

export class CreateExperienceCandidateDto {
    candidate_id: string|any;
    position:string;
    company: string;
    start_at: string;
    end_at: string;
    info: string;
}
