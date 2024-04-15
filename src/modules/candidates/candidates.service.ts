import { Injectable } from '@nestjs/common';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Candidate } from './entities/candidate.entity';
import { Repository } from 'typeorm';
import { async } from 'rxjs';

@Injectable()
export class CandidatesService {
 constructor(
    @InjectRepository(Candidate) private candidateRepository: Repository<Candidate>
 ) {}
   async createNewCandidate(name:string) {
      await this.candidateRepository.save({name:name});
   }
  

  async getInfor(id:string) {
   console.log(id)
    const result = await this.candidateRepository.createQueryBuilder("Candidate")
    .innerJoinAndSelect("Candidate.certificate_candidate", "CertificateCandidate")
    .innerJoinAndSelect("Candidate.education_candidate", "EducationCandidate")
    .innerJoinAndSelect("Candidate.experience_candidate", "ExperienceCandidate")
    .innerJoinAndSelect("Candidate.skills_candidate", "SkillsCandidate")
    .innerJoinAndSelect("Candidate.Project_candidate", "ProjectCandidate")
    .where("Candidate.id = :id", { id: id })
    .getOne()
   console.log(result)
    return result
    ;
  }

  async findAll() {
    return await this.candidateRepository.find();
  }
}
