import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountModule } from '../account/account.module';
import { CandidatesModule } from '../candidates/candidates.module';
import { MailModule } from 'src/mail/mail.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [forwardRef(() => AccountModule),forwardRef(()=>CandidatesModule),forwardRef(()=>MailModule)],
})
export class AuthModule {}
