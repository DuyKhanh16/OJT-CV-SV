import { Module } from '@nestjs/common';
import { ExperienceCandidateService } from './experience_candidate.service';
import { ExperienceCandidateController } from './experience_candidate.controller';

@Module({
  controllers: [ExperienceCandidateController],
  providers: [ExperienceCandidateService],
})
export class ExperienceCandidateModule {}
