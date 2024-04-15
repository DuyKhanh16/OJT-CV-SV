import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2';
@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account) private accountRepository: Repository<Account>,

  ) {}
  async findByEmail(email: string) {
    const result = await this.accountRepository.findOne({
      where: { email },
    });
    console.log(result)
    return result;
  }
  async updatePassword(id: string, password:string  ) {
    const result = await this.accountRepository.createQueryBuilder()
    .update(Account)
    .set({ password: password })
    .where("id = :id", { id })
    .execute();
    return result;
  }
// @Injectable()
// export class AccountService {
//  constructor(
//   @InjectRepository(Account) private accountRepository: Repository<Account>
//  ) {}
 
 async getAccountByEmail(email: string) {
   return await this.accountRepository.findOne({ where: { email: email } });
 }

 async createNewAccount(email: string, password: string, role: number) {
  const hashedPassword = await argon2.hash(password);
   const account = new Account();
   account.email = email;
   account.password = hashedPassword;
   account.role = role;
   await this.accountRepository.save(account);
 }
}
