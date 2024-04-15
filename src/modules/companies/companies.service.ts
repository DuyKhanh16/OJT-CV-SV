import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InfoCompanyRegister } from 'src/interface/interface';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';
import { CreateAddressCompanyDto, UpdateInfoCompanyDto } from './dto/create-company.dto';
import { AddressCompany } from './entities/address_company.entity';
import { LocaltionService } from '../localtion/localtion.service';

@Injectable()
export class CompaniesService {
    constructor(
        @InjectRepository(Company) private companyRepository: Repository<Company>,
        @InjectRepository(AddressCompany) private addressCompanyRepository: Repository<AddressCompany>,
        private readonly locationService: LocaltionService
    ) {}



    // Lấy hết dữ liệu company
    async findAll() {
        return await this.companyRepository.find();
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
        ...infoCandidate,
    })
    .execute();
  }
  // Update thông tin company
  async updateInfoCompany(id:string,updateInfoCompany: UpdateInfoCompanyDto) {
    return await this.companyRepository.createQueryBuilder().update(Company).set({ ...updateInfoCompany}).where("id = :id", { id }).execute();
  }

  // Tạo chi nhánh cho company
  async createNewAddressCompany(createAddressCompanyDto: CreateAddressCompanyDto) {
    const addcompany= await this.companyRepository.findOneBy({id:createAddressCompanyDto.company_id});
    const location = await this.locationService.getLocation(createAddressCompanyDto.location_id);
    return await this.addressCompanyRepository.save({company:addcompany,location:location,address:createAddressCompanyDto.address,map_url:createAddressCompanyDto.map_url,created_at:createAddressCompanyDto.created_at});
  }

  // Lấy thông tin chi nhánh theo id
  async getAddressCompanyById(id: string) {
    return await this.addressCompanyRepository.findOneBy({id:id});
  }
}
