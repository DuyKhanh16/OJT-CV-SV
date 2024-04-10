import { Injectable } from '@nestjs/common';
import { CreateSkillsCandidateDto } from './dto/create-skills_candidate.dto';
import { UpdateSkillsCandidateDto } from './dto/update-skills_candidate.dto';

@Injectable()
export class SkillsCandidateService {
  create(createSkillsCandidateDto: CreateSkillsCandidateDto) {
    return 'This action adds a new skillsCandidate';
  }

  findAll() {
    return `This action returns all skillsCandidate`;
  }

  findOne(id: number) {
    return `This action returns a #${id} skillsCandidate`;
  }

  update(id: number, updateSkillsCandidateDto: UpdateSkillsCandidateDto) {
    return `This action updates a #${id} skillsCandidate`;
  }

  remove(id: number) {
    return `This action removes a #${id} skillsCandidate`;
  }
}
