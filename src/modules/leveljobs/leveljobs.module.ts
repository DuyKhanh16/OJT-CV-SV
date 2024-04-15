import { Module } from '@nestjs/common';
import { LeveljobsService } from './leveljobs.service';
import { LeveljobsController } from './leveljobs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Leveljob } from './entities/leveljob.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Leveljob])],
  controllers: [LeveljobsController],
  providers: [LeveljobsService],
  exports: [LeveljobsService],
})
export class LeveljobsModule {}
