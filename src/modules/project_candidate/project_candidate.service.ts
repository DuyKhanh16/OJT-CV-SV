import { Injectable } from '@nestjs/common';
import { CreateProjectCandidateDto } from './dto/create-project_candidate.dto';
import { UpdateProjectCandidateDto } from './dto/update-project_candidate.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectCandidate } from './entities/project_candidate.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectCandidateService {
  constructor(
    @InjectRepository(ProjectCandidate) private projectCandidateRepository: Repository<ProjectCandidate>,
  ){}


  async findProjects(email:string) {
    const result = await this.projectCandidateRepository.createQueryBuilder() 
    .innerJoinAndSelect("ProjectCandidate.candidate_id","Candidate")
    .innerJoinAndSelect("Candidate.account_candidate_id","Account")
    .where("Account.email = :email", { email: email })
    .getMany();
    console.log(result)
    return result
  }

  async createProjectCandidate(createProjectCandidateDto: CreateProjectCandidateDto) {
    const result = await this.projectCandidateRepository.createQueryBuilder()
    .insert()
    .into(ProjectCandidate)
    .values({
        candidate_id:createProjectCandidateDto.candidate_id,
        name:createProjectCandidateDto.name,
        link:createProjectCandidateDto.link,
        info:createProjectCandidateDto.info,
        start_at:createProjectCandidateDto.start_at,
        end_at:createProjectCandidateDto.end_at
    })
    .execute()

    return result;
  }

 

  async updateProjectCandidate(id:string, updateProjectCandidateDto: UpdateProjectCandidateDto) {
    const result = await this.projectCandidateRepository.createQueryBuilder()
    .update(ProjectCandidate)
    .set({
        name:updateProjectCandidateDto.name,
        link:updateProjectCandidateDto.link,
        info:updateProjectCandidateDto.info,
        start_at:updateProjectCandidateDto.start_at,
        end_at:updateProjectCandidateDto.end_at
    })
    .where(
      "id = :id",{id:id}
    )
    .execute()
    return result
  }

  async deleteProject(id:string) {
    const result = await this.projectCandidateRepository.createQueryBuilder()
    .delete()
    .from(ProjectCandidate)
    .where("id = :id", { id: id })
    .execute()
    return result
    ;
  }
}
