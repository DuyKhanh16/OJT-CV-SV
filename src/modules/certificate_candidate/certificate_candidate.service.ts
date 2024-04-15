import { Injectable } from '@nestjs/common';
import { CreateCertificateCandidateDto } from './dto/create-certificate_candidate.dto';
import { UpdateCertificateCandidateDto } from './dto/update-certificate_candidate.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CertificateCandidate } from './entities/certificate_candidate.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CertificateCandidateService {
  constructor(
    @InjectRepository(CertificateCandidate) private certificateCandidateRepository: Repository<CertificateCandidate>,
  ) {}
  async createCertificate(body: CreateCertificateCandidateDto) {
    const newCertificate = this.certificateCandidateRepository.createQueryBuilder()
    .insert()
    .into(CertificateCandidate)
    .values({
      candidate_id: body.candidate_id,
      name: body.name,
      organization: body.organization,
      start_at: body.start_at,
      end_at: body.end_at,
      info: body.info
    })
    .execute();
    return newCertificate
  }


  async updateCertificate(id:string, body: UpdateCertificateCandidateDto) {
    const update = await this.certificateCandidateRepository.createQueryBuilder()
    .update(CertificateCandidate)
    .set({
      name: body.name,
      organization: body.organization,
      start_at: body.start_at,
      end_at: body.end_at,
      info: body.info
    })
    .where("id = :id", { id: id })
    .execute();
    return "update success"
  }

  async removeEdication(id: string) {
    const result = await this.certificateCandidateRepository.createQueryBuilder()
    .delete()
    .from(CertificateCandidate)
    .where("id = :id", { id: id })
    .execute();
    console.log(result)
    return 'delete success';
  }
}
