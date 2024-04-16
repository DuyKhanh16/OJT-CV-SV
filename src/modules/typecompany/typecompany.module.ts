import { Module } from '@nestjs/common';
import { TypecompanyService } from './typecompany.service';
import { TypecompanyController } from './typecompany.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Typecompany } from './entities/typecompany.entity';

@Module({
  controllers: [TypecompanyController],
  providers: [TypecompanyService],
  imports: [TypeOrmModule.forFeature([Typecompany])],
})
export class TypecompanyModule {}
