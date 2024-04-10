import { Module } from '@nestjs/common';
import { SkillsCandidateService } from './skills_candidate.service';
import { SkillsCandidateController } from './skills_candidate.controller';

@Module({
  controllers: [SkillsCandidateController],
  providers: [SkillsCandidateService],
})
export class SkillsCandidateModule {}
