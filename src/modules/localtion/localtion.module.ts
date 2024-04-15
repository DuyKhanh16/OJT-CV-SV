import { Module } from '@nestjs/common';
import { LocaltionService } from './localtion.service';
import { LocaltionController } from './localtion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Localtion } from './entities/localtion.entity';

@Module({
  controllers: [LocaltionController],
  providers: [LocaltionService],
  exports: [LocaltionService],
  imports: [TypeOrmModule.forFeature([Localtion])],
})
export class LocaltionModule {}
