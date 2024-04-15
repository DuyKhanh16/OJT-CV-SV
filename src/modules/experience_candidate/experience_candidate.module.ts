import { Module } from '@nestjs/common';
import { ExperienceCandidateService } from './experience_candidate.service';
import { ExperienceCandidateController } from './experience_candidate.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExperienceCandidate } from './entities/experience_candidate.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ExperienceCandidate])],
  controllers: [ExperienceCandidateController],
  providers: [ExperienceCandidateService],
})
export class ExperienceCandidateModule {}
