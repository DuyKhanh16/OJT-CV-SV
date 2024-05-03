import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AccountModule } from '../account/account.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CandidatesModule } from '../candidates/candidates.module';
import { CompaniesModule } from '../companies/companies.module';
import { MailerModule } from 'src/mailer/mailer.module';
import { AuthService } from './auth.service';

@Module({
  imports: [
    forwardRef(() => AccountModule),
    JwtModule.register({}),
    forwardRef(() => CandidatesModule),
    forwardRef(() => MailerModule),
    forwardRef(() => CompaniesModule),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
