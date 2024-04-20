import { Injectable } from '@nestjs/common';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto, UpdateInforCandidateDto, updateEducationDto } from './dto/update-candidate.dto';
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
    // .innerJoinAndSelect("Candidate.certificate_candidate", "CertificateCandidate")
    // .innerJoinAndSelect("Candidate.education_candidate", "EducationCandidate")
    // .innerJoinAndSelect("Candidate.experience_candidate", "ExperienceCandidate")
    // .innerJoinAndSelect("Candidate.skills_candidate", "SkillsCandidate")
    // .innerJoinAndSelect("Candidate.Project_candidate", "ProjectCandidate")
    .innerJoinAndSelect("Candidate.account_candidate_id", "Account")
    .where("Account.email = :email", { email: email })
    .getOne()
 
    return result
    ;
  }
  async getAllInformation(email:string) {
    const result = await this.candidateRepository.createQueryBuilder("Candidate")
    .innerJoinAndSelect("Candidate.certificate_candidate", "CertificateCandidate")
    .innerJoinAndSelect("Candidate.education_candidate", "EducationCandidate")
    .innerJoinAndSelect("Candidate.experience_candidate", "ExperienceCandidate")
    // .innerJoinAndSelect("Candidate.skills_candidate", "SkillsCandidate")
    .innerJoinAndSelect("Candidate.project_candidate", "ProjectCandidate")
    .innerJoinAndSelect("Candidate.account_candidate_id", "Account")
    .where("Account.email = :email", { email: email })
    .getOne()
    console.log(result)
    return result
    ;
  }



  async findAll() {
    const result = await this.candidateRepository.createQueryBuilder("Candidate")
    .innerJoinAndSelect("Candidate.account_candidate_id", "Account")
    .innerJoinAndSelect("Candidate.certificate_candidate", "CertificateCandidate")
    .innerJoinAndSelect("Candidate.education_candidate", "EducationCandidate")
    .innerJoinAndSelect("Candidate.experience_candidate", "ExperienceCandidate")
    .innerJoinAndSelect("Candidate.skills_candidate", "SkillsCandidate")
    .innerJoinAndSelect("Candidate.project_candidate", "ProjectCandidate")
    .getMany()
    console.log(result)
    return result;
  }


  // update thong tin cv cua candidate
  async updateAboutMe(aboutMe:string,email:string) {
   const result = await this.candidateRepository.createQueryBuilder()
   .innerJoinAndSelect("Candidate.account_candidate_id", "Account")
   .where("Account.email = :email", { email: email })
    .getOne()
    const resulta = await this.candidateRepository.createQueryBuilder()
   .update(Candidate)
   .set({aboutme:aboutMe})
   .where("id = :id", { id: result.id })
   .execute()
   return result
  }
  async updateInfoCandidate(body:UpdateInforCandidateDto,email:string) {
    const candidate = await this.candidateRepository.createQueryBuilder()
    .innerJoinAndSelect("Candidate.account_candidate_id", "Account")
    .where("Account.email = :email", { email: email })
    .getOne()
    const result = await this.candidateRepository.createQueryBuilder()
    .update(Candidate)
    .set({
      name:body.name,
      birthday:body.birthday,
      gender:body.gender,
      phone:body.phone,
      address: body.address,
      position:body.position,
      link_git:body.link_git,
      avatar:body.avatar
   })
   .where("id = :id", { id: candidate.id })
   .execute()
    return result
  }

 


}
