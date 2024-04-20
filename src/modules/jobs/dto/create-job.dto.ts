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
   
    salary: string|any
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
    // ok 1
    @IsString()
    @IsNotEmpty()
    title: string
// 2
    @IsString()
    @IsNotEmpty()
    description: string

// 3
    @IsString()
    @IsNotEmpty()
    requirements: string

//4 
    @IsString()
    @IsNotEmpty()
    salary: string
// 5
    @IsString()
    @IsNotEmpty()
    expire_at: string
// 6
    // @IsString()
    @IsNotEmpty()
    typejob_id: string
// 7
    // @IsString()
    @IsNotEmpty()
    leveljob_id: string

    //8  @IsString()
    @IsNotEmpty()
    @IsString()
    created_at : string
    // 9
    // @IsString()
    @IsNotEmpty()
    // @IsString()
    address_company_id : string
}
export class applyJobDto{
    candidate_id : string|any
    content: string
    cv_url: string
    job_id: string|any
}

export class salaryDto{
    job:string;
    salary:any
}