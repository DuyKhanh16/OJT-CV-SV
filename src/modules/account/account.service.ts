import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { Repository } from 'typeorm';

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
}
