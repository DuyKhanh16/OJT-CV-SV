import { Module, forwardRef } from '@nestjs/common';
import { EducationCandidateService } from './education_candidate.service';
import { EducationCandidateController } from './education_candidate.controller';
import { TypeORMError } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EducationCandidate } from './entities/education_candidate.entity';
import { CandidatesModule } from '../candidates/candidates.module';

@Module({
  imports:[TypeOrmModule.forFeature([EducationCandidate]),
          forwardRef(() => CandidatesModule)
          ],
  controllers: [EducationCandidateController],
  providers: [EducationCandidateService],
})
export class EducationCandidateModule {}
