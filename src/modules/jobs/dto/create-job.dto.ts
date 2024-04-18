import { IsNotEmpty, IsString } from "class-validator";
import { Typejob } from "src/modules/typejob/entities/typejob.entity";

export class CreateJobDto {
    // ok
    @IsString()
    @IsNotEmpty()
    title: string
// ok
    @IsString()
    @IsNotEmpty()
    description: string

// giao diện chưa có
    @IsString()
    @IsNotEmpty()
    requirements: string
// ok
    @IsString()
    @IsNotEmpty()
    salary: string
// ok
    @IsString()
    @IsNotEmpty()
    expire_at: string
// ok
    @IsString()
    @IsNotEmpty()
    address_company_id: string
// ok
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