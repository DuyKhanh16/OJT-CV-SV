import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InfoCompanyRegister } from 'src/interface/interface';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CompaniesService {
    constructor(
        @InjectRepository(Company) private companyRepository: Repository<Company>,
    ) {}
  async createNewCompany (infoCandidate: InfoCompanyRegister) {
    return await this.companyRepository.save({name:infoCandidate.nameComany,addressRegister:infoCandidate.address,phone:infoCandidate.phone,emailCompany:infoCandidate.emailCompany});
  }
}
