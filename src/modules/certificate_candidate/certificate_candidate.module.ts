import { Module, forwardRef } from '@nestjs/common';
import { CertificateCandidateService } from './certificate_candidate.service';
import { CertificateCandidateController } from './certificate_candidate.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CertificateCandidate } from './entities/certificate_candidate.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([CertificateCandidate]),
            forwardRef(() => AuthModule)
],
  controllers: [CertificateCandidateController],
  providers: [CertificateCandidateService],
})
export class CertificateCandidateModule {}
