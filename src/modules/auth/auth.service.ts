import { HttpCode, Injectable } from '@nestjs/common';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { AccountService } from '../account/account.service';
import { CandidatesService } from '../candidates/candidates.service';
import { CreateCompanyDto } from './dto/create-auth.dto';
import { InfoCompanyRegister } from 'src/interface/interface';
import { CompaniesService } from '../companies/companies.service';
import { log } from 'console';
import { RoleEnum } from 'src/constants/enums/enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly accountService: AccountService,
    private readonly candidateService: CandidatesService,
    private readonly companyService: CompaniesService
  ) {}
// service đăng ký người dùng
 async registerCandidate(createCandidateAuthDto: UpdateAuthDto) {
  // check Mail tồn tại
   const account = await this.accountService.getAccountByEmail(createCandidateAuthDto.email);
   if (account) {
     throw new Error('email đã tồn tại');
   }
  //  Tạo tài khoản và thông tin người dùng
  const role= RoleEnum.CANDIDATE
  try {
    await this.accountService.createNewAccount(createCandidateAuthDto.email, createCandidateAuthDto.password,role);
    await this.candidateService.createNewCandidate(createCandidateAuthDto.name);
    return
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
 }

//  service đăng ký công ty
  async registerCompany(createCompanyDto: CreateCompanyDto) {
    // check Mail tồn tại
   const account = await this.accountService.getAccountByEmail(createCompanyDto.email);
   if (account) {
     throw new Error('email đã tồn tại');
   }
  
  // tạo tài khoản và thông tin công ty
  const role= RoleEnum.COMPANY
   try {
    await this.accountService.createNewAccount(createCompanyDto.email, createCompanyDto.password,role);
    const infoCandidate:InfoCompanyRegister={
      nameComany: createCompanyDto.nameCompany,
      address: createCompanyDto.address,
      phone: createCompanyDto.phone,
      emailCompany: createCompanyDto.emailCompany
    }
    await this.companyService.createNewCompany(infoCandidate);
    return
    } catch (error) {
    console.log(error);
    throw new Error(error);
  }
  }
}
