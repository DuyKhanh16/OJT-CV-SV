import { Module } from '@nestjs/common';
import { CertificateCandidateService } from './certificate_candidate.service';
import { CertificateCandidateController } from './certificate_candidate.controller';

@Module({
  controllers: [CertificateCandidateController],
  providers: [CertificateCandidateService],
})
export class CertificateCandidateModule {}
