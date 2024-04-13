import { Module } from '@nestjs/common';
import { CertificateCandidateService } from './certificate_candidate.service';
import { CertificateCandidateController } from './certificate_candidate.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CertificateCandidate } from './entities/certificate_candidate.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CertificateCandidate])],
  controllers: [CertificateCandidateController],
  providers: [CertificateCandidateService],
})
export class CertificateCandidateModule {}
