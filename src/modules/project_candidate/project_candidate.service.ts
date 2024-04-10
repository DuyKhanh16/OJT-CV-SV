import { Injectable } from '@nestjs/common';
import { CreateProjectCandidateDto } from './dto/create-project_candidate.dto';
import { UpdateProjectCandidateDto } from './dto/update-project_candidate.dto';

@Injectable()
export class ProjectCandidateService {
  create(createProjectCandidateDto: CreateProjectCandidateDto) {
    return 'This action adds a new projectCandidate';
  }

  findAll() {
    return `This action returns all projectCandidate`;
  }

  findOne(id: number) {
    return `This action returns a #${id} projectCandidate`;
  }

  update(id: number, updateProjectCandidateDto: UpdateProjectCandidateDto) {
    return `This action updates a #${id} projectCandidate`;
  }

  remove(id: number) {
    return `This action removes a #${id} projectCandidate`;
  }
}
