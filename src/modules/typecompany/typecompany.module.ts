import { Module } from '@nestjs/common';
import { TypecompanyService } from './typecompany.service';
import { TypecompanyController } from './typecompany.controller';

@Module({
  controllers: [TypecompanyController],
  providers: [TypecompanyService],
})
export class TypecompanyModule {}
