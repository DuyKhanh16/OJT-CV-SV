import { IsNotEmpty, IsString } from "class-validator";

export class CreateEducationCandidateDto {
    candidate_id:string
    name_education:string
    major:string
    start_at:string
    end_at:string
    info:string
}
