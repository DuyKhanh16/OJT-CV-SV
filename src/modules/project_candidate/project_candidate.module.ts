import { Module } from '@nestjs/common';
import { ProjectCandidateService } from './project_candidate.service';
import { ProjectCandidateController } from './project_candidate.controller';

@Module({
  controllers: [ProjectCandidateController],
  providers: [ProjectCandidateService],
})
export class ProjectCandidateModule {}
