import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InfoCompanyRegister } from 'src/interface/interface';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';
import { CreateAddressCompanyDto, UpdateInfoCompanyDto } from './dto/create-company.dto';
import { AddressCompany } from './entities/address_company.entity';
import { LocaltionService } from '../localtion/localtion.service';
import { TypecompanyService } from '../typecompany/typecompany.service';

@Injectable()
export class CompaniesService {
    constructor(
        @InjectRepository(Company) private companyRepository: Repository<Company>,
        @InjectRepository(AddressCompany) private addressCompanyRepository: Repository<AddressCompany>,
        private readonly locationService: LocaltionService,
        private readonly typecompanyService: TypecompanyService
    ) {}



    // Lấy hết dữ liệu company
    async findAll() {
        const result = await this.companyRepository.createQueryBuilder("company")
        .innerJoinAndSelect("company.address_company", "address")
        .innerJoinAndSelect("company.typeCompany_id", "typecompany")
        .getMany()
        console.log(result)
        return result;
    }
    // lấy company theo Id
    async getCompanyById(id: string) {
        return await this.companyRepository.findOneBy({id:id});
    }

    // Tạo mới company
  async createNewCompany (infoCandidate: InfoCompanyRegister) {
    const newCompany= await this.companyRepository.createQueryBuilder()
    .insert()
    .into(Company)
    .values({ 
      name:infoCandidate.name,
      phone:infoCandidate.phone,
      account_company_id:infoCandidate.account_company_id
    })
    .execute();
    //tra id company moi cho bang address company
    const company = await this.companyRepository.findOneBy({id:newCompany.identifiers[0].id})
    console.log(company)
   
    return company
  }

  // thêm mới chi nhánh
  async createNewAddress(id:string|any,addressCompany: string) {
    const addDress= await this.addressCompanyRepository.createQueryBuilder()
    .insert()
    .into(AddressCompany)
    .values({ 
      company_id:id,
      address:addressCompany
    })
    .execute();
    return addDress
  }
  // Update thông tin company

  async updateInfoCompany(id:number,updateInfoCompany: UpdateInfoCompanyDto) {
    const {name,website,description,policy,email,phone,photo,link_facebook,size,typeCompany_id} = updateInfoCompany
    const result = await this.companyRepository.createQueryBuilder().update(Company).set({
      name: updateInfoCompany.name,
      website: updateInfoCompany.website,
      description: updateInfoCompany.description,
      policy: updateInfoCompany.policy,
      email_company: updateInfoCompany.email,
      phone: updateInfoCompany.phone,
      logo: updateInfoCompany.photo,
      link_facebook: updateInfoCompany.link_facebook,
      size: updateInfoCompany.size as any,
      typeCompany_id: updateInfoCompany.typeCompany_id as any
    }).where("id = :id", { id }).execute();
  }

  // Tạo chi nhánh cho company
  // async createNewAddressCompany(createAddressCompanyDto: CreateAddressCompanyDto) {
  //   const addcompany= await this.companyRepository.findOneBy({id:createAddressCompanyDto.company_id});
  //   const location = await this.locationService.getLocation(createAddressCompanyDto.location_id);
  //   return await this.addressCompanyRepository.save({company:addcompany,location:location,address:createAddressCompanyDto.address,map_url:createAddressCompanyDto.map_url,created_at:createAddressCompanyDto.created_at});
  // }

  // Lấy thông tin chi nhánh theo id
  async getAddressCompanyById(id: string) {
    return await this.addressCompanyRepository.findOneBy({id:id});
  }

  //lay thong tin cty
  async getInfor(email:string) {
    console.log("111111",email)
    const result = await this.companyRepository.createQueryBuilder("Company")
    .innerJoinAndSelect("Company.address_company", "AddressCompany")
    .innerJoinAndSelect("Company.account_company_id", "Account") 
    .where("Account.email = :email", { email: email })
    .getOne()
  //  console.log(result,"1111111111111111111111111111111111111111111111111")
    return result
  }

  // xoá địa chỉ chi nhánh công ty
  async deleteAddressCompany(id:string){
    return await this.addressCompanyRepository.delete({id:id})
  }

  async getInfoCompanyById(id: string) {
    const result = await this.companyRepository.createQueryBuilder("Company")
    .innerJoinAndSelect("Company.address_company", "AddressCompany")
    .innerJoinAndSelect("Company.account_company_id", "Account")
    .innerJoinAndSelect("Company.typeCompany_id", "Typecompany")
    .where("Company.id = :id", { id: id })
    .getOne()
    return result
  }
}
    