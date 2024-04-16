import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class UpdateInfoCompanyDto{
    @IsString()
    name: string

    @IsString()
    logo: string

    @IsString()
    website: string

    @IsString()
    link_facebook: string

   @IsString()
   emailCompany: string

   @IsNumber()
   size:number

    @IsString()
   phone:string

    @IsString()
    description: string

    @IsString()
    typeCompany_id: string
  
}

export class CreateAddressCompanyDto{
    @IsString()
    @IsNotEmpty()
    company_id: string

    @IsString()
    @IsNotEmpty()
    location_id: string

    @IsString()
    @IsNotEmpty()
    address: string

    @IsString()
    @IsNotEmpty()
    map_url: string

    @IsString()
    @IsNotEmpty()
    created_at: string
}