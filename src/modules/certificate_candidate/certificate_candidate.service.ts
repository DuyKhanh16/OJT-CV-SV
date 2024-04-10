import { Injectable } from '@nestjs/common';
import { CreateCertificateCandidateDto } from './dto/create-certificate_candidate.dto';
import { UpdateCertificateCandidateDto } from './dto/update-certificate_candidate.dto';

@Injectable()
export class CertificateCandidateService {
  create(createCertificateCandidateDto: CreateCertificateCandidateDto) {
    return 'This action adds a new certificateCandidate';
  }

  findAll() {
    return `This action returns all certificateCandidate`;
  }

  findOne(id: number) {
    return `This action returns a #${id} certificateCandidate`;
  }

  update(id: number, updateCertificateCandidateDto: UpdateCertificateCandidateDto) {
    return `This action updates a #${id} certificateCandidate`;
  }

  remove(id: number) {
    return `This action removes a #${id} certificateCandidate`;
  }
}
