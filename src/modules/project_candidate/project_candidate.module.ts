import { Module, forwardRef } from '@nestjs/common';
import { ProjectCandidateService } from './project_candidate.service';
import { ProjectCandidateController } from './project_candidate.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectCandidate } from './entities/project_candidate.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectCandidate]),
    forwardRef(() => AuthModule)
  ],
  controllers: [ProjectCandidateController],
  providers: [ProjectCandidateService],
})
export class ProjectCandidateModule {}
