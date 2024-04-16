import { Module, forwardRef } from '@nestjs/common';
import { ExperienceCandidateService } from './experience_candidate.service';
import { ExperienceCandidateController } from './experience_candidate.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExperienceCandidate } from './entities/experience_candidate.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([ExperienceCandidate]),
              forwardRef(() => AuthModule)
],
  controllers: [ExperienceCandidateController],
  providers: [ExperienceCandidateService],
})
export class ExperienceCandidateModule {}
