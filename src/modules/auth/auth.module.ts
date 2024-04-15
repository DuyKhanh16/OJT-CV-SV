import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AccountModule } from '../account/account.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CandidatesModule } from '../candidates/candidates.module';
import { MailModule } from 'src/mail/mail.module';
import { CompaniesModule } from '../companies/companies.module';

@Module({
  imports: [forwardRef(() => AccountModule),JwtModule.register({}),
    forwardRef(()=>CandidatesModule),forwardRef(()=>MailModule),
    forwardRef(()=>CompaniesModule)
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}
