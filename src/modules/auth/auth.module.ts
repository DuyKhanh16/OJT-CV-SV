import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
// import { Account } from '../account/entities/account.entity';
import { JwtModule } from '@nestjs/jwt';
import { AccountModule } from '../account/account.module';

@Module({
  imports: [forwardRef(() => AccountModule),JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}
