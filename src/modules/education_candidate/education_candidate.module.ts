import { Module } from '@nestjs/common';
import { EducationCandidateService } from './education_candidate.service';
import { EducationCandidateController } from './education_candidate.controller';

@Module({
  controllers: [EducationCandidateController],
  providers: [EducationCandidateService],
})
export class EducationCandidateModule {}
