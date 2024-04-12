import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { JwtService } from "@nestjs/jwt";
import { AccountModule } from '../account/account.module';
import { AccountService } from '../account/account.service';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly accountService: AccountService
  ){}
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
