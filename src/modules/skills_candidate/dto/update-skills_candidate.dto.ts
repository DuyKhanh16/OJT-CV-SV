import { PartialType } from '@nestjs/swagger';
import { CreateSkillsCandidateDto } from './create-skills_candidate.dto';

export class UpdateSkillsCandidateDto extends PartialType(CreateSkillsCandidateDto) {}
