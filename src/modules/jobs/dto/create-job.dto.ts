import { IsNotEmpty, IsString } from "class-validator";
import { Typejob } from "src/modules/typejob/entities/typejob.entity";

export class CreateJobDto {
    @IsString()
    @IsNotEmpty()
    title: string

    @IsString()
    @IsNotEmpty()
    description: string


    @IsString()
    @IsNotEmpty()
    requirements: string

    @IsString()
    @IsNotEmpty()
    salary: string

    @IsString()
    @IsNotEmpty()
    expire_at: string
    
    @IsString()
    @IsNotEmpty()
    address_company_id: string

    @IsString()
    @IsNotEmpty()
    typejob_id: string

    @IsString()
    @IsNotEmpty()
    leveljob_id: string
}

export class UpdateJobDto {
    @IsString()
    @IsNotEmpty()
    title: string

    @IsString()
    @IsNotEmpty()
    description: string


    @IsString()
    @IsNotEmpty()
    requirements: string

    @IsString()
    @IsNotEmpty()
    salary: string

    @IsString()
    @IsNotEmpty()
    expire_at: string

    @IsString()
    @IsNotEmpty()
    typejob_id: string

    @IsString()
    @IsNotEmpty()
    leveljob_id: string
}