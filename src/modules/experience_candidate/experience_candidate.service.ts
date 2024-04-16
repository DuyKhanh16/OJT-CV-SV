import { Injectable } from '@nestjs/common';
import { CreateExperienceCandidateDto } from './dto/create-experience_candidate.dto';
import { UpdateExperienceCandidateDto } from './dto/update-experience_candidate.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExperienceCandidate } from './entities/experience_candidate.entity';

@Injectable()
export class ExperienceCandidateService {
  constructor(
    @InjectRepository(ExperienceCandidate) private certificateCandidateRepository: Repository<ExperienceCandidate>,
  ) {}
  createExperience(createExperienceCandidateDto: CreateExperienceCandidateDto) {
    console.log(createExperienceCandidateDto)
    const result = this.certificateCandidateRepository.createQueryBuilder()
    .insert()
    .into(ExperienceCandidate)
    .values({
      candidate_id: createExperienceCandidateDto.candidate_id,
      position: createExperienceCandidateDto.position,
      company: createExperienceCandidateDto.company,
      start_at: createExperienceCandidateDto.start_at,
      end_at: createExperienceCandidateDto.end_at,
      info: createExperienceCandidateDto.info
    })
    .execute();
    return result
  }

  updateExperience(id:string, updateExperienceCandidateDto: UpdateExperienceCandidateDto) {
    const result = this.certificateCandidateRepository.createQueryBuilder()
    .update(ExperienceCandidate)
    .set({
      position: updateExperienceCandidateDto.position,
      company: updateExperienceCandidateDto.company,
      start_at: updateExperienceCandidateDto.start_at,
      end_at: updateExperienceCandidateDto.end_at,
      info: updateExperienceCandidateDto.info
    })
    .where("id = :id", { id: id })
    .execute();
    return result
  }

  removeExperience(id:string) {
    const result = this.certificateCandidateRepository.createQueryBuilder()
    .delete()
    .from(ExperienceCandidate)
    .where("id = :id", { id: id })
    .execute();
    return result
  }
}
