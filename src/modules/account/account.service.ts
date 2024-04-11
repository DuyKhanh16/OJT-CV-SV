import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2';
import { RoleEnum } from 'src/constants/enums/enum';

@Injectable()
export class AccountService {
 constructor(
  @InjectRepository(Account) private accountRepository: Repository<Account>
 ) {}
 
 async getAccountByEmail(email: string) {
   return await this.accountRepository.findOne({ where: { email: email } });
 }

 async createNewAccount(email: string, password: string) {
  const hashedPassword = await argon2.hash(password);
   const account = new Account();
   account.email = email;
   account.password = hashedPassword;
   account.role = RoleEnum.CANDIDATE;
   await this.accountRepository.save(account);
 }
}
