import { IsNotEmpty, IsString } from "class-validator";

export class CreateCertificateCandidateDto {
    candidate_id: string|any;
    name: string;
    organization: string;   
    start_at: string;
    end_at: string;
    info: string;
    
}
