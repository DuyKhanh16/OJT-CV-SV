import { Module } from '@nestjs/common';
import { ProjectCandidateService } from './project_candidate.service';
import { ProjectCandidateController } from './project_candidate.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectCandidate } from './entities/project_candidate.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectCandidate])],
  controllers: [ProjectCandidateController],
  providers: [ProjectCandidateService],
})
export class ProjectCandidateModule {}
