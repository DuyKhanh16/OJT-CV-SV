import { PartialType } from '@nestjs/swagger';
import { CreateProjectCandidateDto } from './create-project_candidate.dto';

export class UpdateProjectCandidateDto extends PartialType(CreateProjectCandidateDto) {}
