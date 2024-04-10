import { Module } from '@nestjs/common';
import { TypejobService } from './typejob.service';
import { TypejobController } from './typejob.controller';

@Module({
  controllers: [TypejobController],
  providers: [TypejobService],
})
export class TypejobModule {}
