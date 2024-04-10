import { Module } from '@nestjs/common';
import { LocaltionService } from './localtion.service';
import { LocaltionController } from './localtion.controller';

@Module({
  controllers: [LocaltionController],
  providers: [LocaltionService],
})
export class LocaltionModule {}
