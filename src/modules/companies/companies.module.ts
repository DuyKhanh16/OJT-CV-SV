import { Module, forwardRef } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { AddressCompany } from './entities/address_company.entity';
import { LocaltionModule } from '../localtion/localtion.module';
import { AuthModule } from '../auth/auth.module';
import { TypecompanyModule } from '../typecompany/typecompany.module';

@Module({
  imports: [TypeOrmModule.forFeature([Company]),TypeOrmModule.forFeature([AddressCompany]),
    forwardRef(()=>LocaltionModule),
    forwardRef(()=>AuthModule),
    forwardRef(()=>TypecompanyModule)
  ],
  controllers: [CompaniesController],
  providers: [CompaniesService],
  exports: [CompaniesService],
})
export class CompaniesModule {}
