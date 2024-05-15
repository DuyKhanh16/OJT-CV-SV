
import { IsNotEmpty, IsNumber, IsString } from "class-validator"


export class UpdateInfoCompanyDto {
  @IsString()
  name: string;


  @IsString()
  website: string;


  @IsString()
  link_facebook: string;


  @IsString()
  email: string;

  @IsString()
// @IsNotEmpty()
  photo: string;

  @IsString()
  phone: string;


  @IsString()
  size: string;


  @IsString()
  typeCompany_id: string;

  @IsString()
  description: string;

  @IsString()
  policy: string;
}

export class CreateAddressCompanyDto {
  // @IsString()
  // @IsNotEmpty()
  // company_id: string

  // @IsString()
  // @IsNotEmpty()
  // location_id: string

  @IsString()
  @IsNotEmpty()
  address: string;

  // @IsString()
  // @IsNotEmpty()
  // map_url: string

  // @IsString()
  // @IsNotEmpty()
  // created_at: string
}
