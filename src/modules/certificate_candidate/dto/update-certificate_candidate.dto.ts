import { PartialType } from '@nestjs/swagger';
import { CreateCertificateCandidateDto } from './create-certificate_candidate.dto';

export class UpdateCertificateCandidateDto extends PartialType(CreateCertificateCandidateDto) {}
