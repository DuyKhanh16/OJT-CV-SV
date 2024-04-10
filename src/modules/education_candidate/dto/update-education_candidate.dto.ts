import { PartialType } from '@nestjs/swagger';
import { CreateEducationCandidateDto } from './create-education_candidate.dto';

export class UpdateEducationCandidateDto extends PartialType(CreateEducationCandidateDto) {}
