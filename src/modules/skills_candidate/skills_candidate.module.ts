import { Module } from '@nestjs/common';
import { SkillsCandidateService } from './skills_candidate.service';
import { SkillsCandidateController } from './skills_candidate.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkillsCandidate } from './entities/skills_candidate.entity';

@Module({
  imports:[TypeOrmModule.forFeature([SkillsCandidate])],
  controllers: [SkillsCandidateController],
  providers: [SkillsCandidateService],
})
export class SkillsCandidateModule {}
