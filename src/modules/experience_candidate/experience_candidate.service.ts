import { Injectable } from '@nestjs/common';
import { CreateExperienceCandidateDto } from './dto/create-experience_candidate.dto';
import { UpdateExperienceCandidateDto } from './dto/update-experience_candidate.dto';

@Injectable()
export class ExperienceCandidateService {
  create(createExperienceCandidateDto: CreateExperienceCandidateDto) {
    return 'This action adds a new experienceCandidate';
  }

  findAll() {
    return `This action returns all experienceCandidate`;
  }

  findOne(id: number) {
    return `This action returns a #${id} experienceCandidate`;
  }

  update(id: number, updateExperienceCandidateDto: UpdateExperienceCandidateDto) {
    return `This action updates a #${id} experienceCandidate`;
  }

  remove(id: number) {
    return `This action removes a #${id} experienceCandidate`;
  }
}
