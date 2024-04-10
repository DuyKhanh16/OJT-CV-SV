import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from 'ormconfig';

@Module({
  imports: [TypeOrmModule.forRoot(config), UserModule], 
  controllers: [],
  providers: [],
})
export class AppModule {}
