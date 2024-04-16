import { Module, forwardRef } from '@nestjs/common';
import { SkillsCandidateService } from './skills_candidate.service';
import { SkillsCandidateController } from './skills_candidate.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkillsCandidate } from './entities/skills_candidate.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports:[TypeOrmModule.forFeature([SkillsCandidate]),
forwardRef(() => AuthModule)

  ],
  controllers: [SkillsCandidateController],
  providers: [SkillsCandidateService],
})
export class SkillsCandidateModule {}
