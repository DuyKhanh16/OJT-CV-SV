import { IsNotEmpty, IsString } from "class-validator";

export class CreateCertificateCandidateDto {

    @IsNotEmpty()
    @IsString()
    candidate_id: string|any;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    organization: string;   

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
