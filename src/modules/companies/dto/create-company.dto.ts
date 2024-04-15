import { IsNotEmpty, IsString } from "class-validator"

export class UpdateInfoCompanyDto{
    @IsString()
    name: string

    @IsString()
    website: string

    @IsString()
    link_facebook: string

    @IsString()
    link_linkedin: string

    @IsString()
    link_github: string

    @IsString()
    addressRegister: string

    @IsString()
    description: string

    @IsString()
    policy: string
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