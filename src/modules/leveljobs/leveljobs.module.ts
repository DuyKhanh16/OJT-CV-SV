import { Module } from '@nestjs/common';
import { LeveljobsService } from './leveljobs.service';
import { LeveljobsController } from './leveljobs.controller';

@Module({
  controllers: [LeveljobsController],
  providers: [LeveljobsService],
})
export class LeveljobsModule {}
