import { Module } from '@nestjs/common';
import { TypejobService } from './typejob.service';
import { TypejobController } from './typejob.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Typejob } from './entities/typejob.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Typejob])],
  controllers: [TypejobController],
  providers: [TypejobService],
  exports: [TypejobService],
})
export class TypejobModule {}
