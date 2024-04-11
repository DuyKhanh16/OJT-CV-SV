import { Injectable } from '@nestjs/common';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { AccountService } from '../account/account.service';
import { CandidatesService } from '../candidates/candidates.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly accountService: AccountService,
    private readonly candidateService: CandidatesService
  ) {}

 async registerCandidate(createCandidateAuthDto: UpdateAuthDto) {
   const account = await this.accountService.getAccountByEmail(createCandidateAuthDto.email);
   if (account) {
     throw new Error('email đã tồn tại');
   }
  try {
    await this.accountService.createNewAccount(createCandidateAuthDto.email, createCandidateAuthDto.password);
    await this.candidateService.createNewCandidate(createCandidateAuthDto.name);
    return
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
  
 }
}
