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
   async createNewCandidate(name:string,id:string|any) {
      const result = await this.candidateRepository.createQueryBuilder()
      .insert()
      .into(Candidate)
      .values(
         {name:name,account_candidate_id:id}
      )
      .execute()
      console.log(result)
      return result;
   }
  

  async getInfor(email:string) {
    const result = await this.candidateRepository.createQueryBuilder("Candidate")
   //  .innerJoinAndSelect("Candidate.certificate_candidate", "CertificateCandidate")
   //  .innerJoinAndSelect("Candidate.education_candidate", "EducationCandidate")
   //  .innerJoinAndSelect("Candidate.experience_candidate", "ExperienceCandidate")
   //  .innerJoinAndSelect("Candidate.skills_candidate", "SkillsCandidate")
   //  .innerJoinAndSelect("Candidate.Project_candidate", "ProjectCandidate")
    .innerJoinAndSelect("Candidate.account_candidate_id", "Account")
    .where("Account.email = :email", { email: email })
    .getOne()
   console.log(result)
    return result
    ;
  }

  async findAll() {
    return await this.candidateRepository.find();
  }

  async updateAboutMe(aboutMe:string,email:string) {
   const result = await this.candidateRepository.createQueryBuilder()
   .innerJoinAndSelect("Candidate.account_candidate_id", "Account")
   .update(Candidate)
   .set({aboutme:aboutMe})
   .where("Account.email = :email", { email: email })
   .execute()

   return result
  }
}
