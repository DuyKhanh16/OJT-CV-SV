import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { JwtService } from "@nestjs/jwt";
import { AccountService } from '../account/account.service';
import * as argon2 from 'argon2';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { CandidatesService } from '../candidates/candidates.service';
import { CreateCompanyDto } from './dto/create-auth.dto';
import { InfoCompanyRegister } from 'src/interface/interface';
import { CompaniesService } from '../companies/companies.service';
import { RoleEnum } from 'src/constants/enums/enum';

@Injectable()
export class AuthService {
  constructor( private readonly accountService: AccountService,
    private readonly candidateService: CandidatesService,
    private readonly companyService: CompaniesService,
    private readonly jwtService: JwtService,
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
async login(createAuthDto: CreateAuthDto) {
  const { email, password } = createAuthDto;
  
  const account = await this.accountService.findByEmail(email);
  console.log(account)
  

  if (!account) {   
    throw new UnauthorizedException('email không đúng');
  }
  const checkPassword = await argon2.verify(account.password, password);
  if (!checkPassword) {
    throw new UnauthorizedException(' mật khẩu không đúng');
  }
  return {
    role: account.role,
    token_access: await this.generateAccessToken({ email: account.email, role: account.role }),
    token: await this.generateToken({ email: account.email, role: account.role }),
  };
}

async getOTP(email: string) {
  const result = await this.accountService.findByEmail(email);
  const newP = Math.ceil(Math.random() * 9999)
  if (!result) { 
    throw new UnauthorizedException('email không đúng');
  } 
  return newP
}

async getNewPassword(email:string){
}

async generateToken(payload) {
  return this.jwtService.sign(payload,{
    // expiresIn: '1d',
    secret: 'token'
  });
}

async generateAccessToken(payload) {
  return this.jwtService.sign(payload,{
    // expiresIn: '1d',
    secret: 'access-token'
  });

}

async verifyAccessToken(token: string) {
  // console.log("token", token)
   return await this.jwtService.verify(token, {
     secret: 'token'
   });
 } 
  
}
