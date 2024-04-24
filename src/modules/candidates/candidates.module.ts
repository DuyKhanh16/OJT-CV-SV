import { Module, forwardRef } from '@nestjs/common';
import { CandidatesService } from './candidates.service';
import { CandidatesController } from './candidates.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Candidate } from './entities/candidate.entity';
import { AuthGuard } from '../guard/auth.guard';
import { AuthModule } from '../auth/auth.module';
import { SaveCandidateJob } from './entities/save-candidate-job.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Candidate,SaveCandidateJob]),
    forwardRef(()=>AuthModule),
],
  controllers: [CandidatesController],
  providers: [CandidatesService],
  exports: [CandidatesService],
})
export class CandidatesModule {}
