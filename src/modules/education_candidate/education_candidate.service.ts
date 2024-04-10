import { Injectable } from '@nestjs/common';
import { CreateEducationCandidateDto } from './dto/create-education_candidate.dto';
import { UpdateEducationCandidateDto } from './dto/update-education_candidate.dto';

@Injectable()
export class EducationCandidateService {
  create(createEducationCandidateDto: CreateEducationCandidateDto) {
    return 'This action adds a new educationCandidate';
  }

  findAll() {
    return `This action returns all educationCandidate`;
  }

  findOne(id: number) {
    return `This action returns a #${id} educationCandidate`;
  }

  update(id: number, updateEducationCandidateDto: UpdateEducationCandidateDto) {
    return `This action updates a #${id} educationCandidate`;
  }

  remove(id: number) {
    return `This action removes a #${id} educationCandidate`;
  }
}
