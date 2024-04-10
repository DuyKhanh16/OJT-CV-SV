import { PartialType } from '@nestjs/swagger';
import { CreateExperienceCandidateDto } from './create-experience_candidate.dto';

export class UpdateExperienceCandidateDto extends PartialType(CreateExperienceCandidateDto) {}
