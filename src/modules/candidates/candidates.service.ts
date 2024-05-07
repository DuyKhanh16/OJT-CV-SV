import { Injectable } from '@nestjs/common';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto, UpdateInforCandidateDto, updateEducationDto } from './dto/update-candidate.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Candidate } from './entities/candidate.entity';
import { Repository } from 'typeorm';
import { async } from 'rxjs';
import { SaveCandidateJob } from './entities/save-candidate-job.entity';
import { AccountService } from '../account/account.service';
import { JobsService } from '../jobs/jobs.service';
import { EventsGateway } from 'src/socket/socket.gateway';


@Injectable()
export class CandidatesService {
 constructor(
    @InjectRepository(Candidate) private candidateRepository: Repository<Candidate>,
    @InjectRepository(SaveCandidateJob) private saveCandidateJobRepository: Repository<SaveCandidateJob>,
    private readonly accountService: AccountService,
    private readonly jobsService: JobsService,
    private readonly socketioService: EventsGateway
    
 ) {}
   async createNewCandidate(name:string,id:string|any) {
      const result = await this.candidateRepository.createQueryBuilder()
      .insert()
      .into(Candidate)
      .values(
         {name:name,account_candidate_id:id}
      )
      .execute()
      return result;
   }
  

  async getInfor(email:string) {
    const result = await this.candidateRepository.createQueryBuilder("Candidate")
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
    .innerJoinAndSelect("Candidate.skills_candidate", "SkillsCandidate")
    .innerJoinAndSelect("Candidate.project_candidate", "ProjectCandidate")
    .innerJoinAndSelect("Candidate.account_candidate_id", "Account")
    .where("Account.email = :email", { email: email })
    .getOne()
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
    return result;
  }

  // phan trang
 async findAllPaging(query) {
   const result = await this.candidateRepository.createQueryBuilder("Candidate")
   .innerJoinAndSelect("Candidate.account_candidate_id", "Account")
   .innerJoinAndSelect("Candidate.certificate_candidate", "CertificateCandidate")
   .innerJoinAndSelect("Candidate.education_candidate", "EducationCandidate")
   .innerJoinAndSelect("Candidate.experience_candidate", "ExperienceCandidate")
   .innerJoinAndSelect("Candidate.skills_candidate", "SkillsCandidate")
   .innerJoinAndSelect("Candidate.project_candidate", "ProjectCandidate")
   .skip(query.skip)
   .take(query.take)
   .getMany()
   console.log("3333",result) 
   return result
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

  async getInforCandidatebyId (id:string) {
    const result = await this.candidateRepository.createQueryBuilder("Candidate")
    .innerJoinAndSelect("Candidate.certificate_candidate", "CertificateCandidate")
    .innerJoinAndSelect("Candidate.education_candidate", "EducationCandidate")
    .innerJoinAndSelect("Candidate.experience_candidate", "ExperienceCandidate")
    .innerJoinAndSelect("Candidate.skills_candidate", "SkillsCandidate")
    .innerJoinAndSelect("Candidate.project_candidate", "ProjectCandidate")
    .where("Candidate.id = :id", { id: id })
    .getOne()
    return result
  }

  async searchCandidate (name:string,location:string,level:string,position:string) {
    console.log(name,location,level,position)
    const result = await this.candidateRepository.createQueryBuilder("Candidate")
    .innerJoinAndSelect("Candidate.certificate_candidate", "CertificateCandidate")
    .innerJoinAndSelect("Candidate.education_candidate", "EducationCandidate")
    .innerJoinAndSelect("Candidate.experience_candidate", "ExperienceCandidate")
    .innerJoinAndSelect("Candidate.skills_candidate", "SkillsCandidate")
    .innerJoinAndSelect("Candidate.project_candidate", "ProjectCandidate")
    .where("Candidate.name like :name", { name: `%${name}%` })
    if(location){
    result.andWhere("Candidate.address like :location", { location: `%${location}%` })
    }
    if(position){
      result.andWhere("Candidate.position like :position", { position: `%${position}%` })
    } 
    return result.getMany()
}

// tạo bản lưu candidate-job
async createSaveCandidateJob (candidate_email:string,job_id:string) {

  const candidate= await this.accountService.getcandidateByEmail(candidate_email)
  const job= await this.jobsService.getJobByIdTypeEntity(job_id)
  return await this.saveCandidateJobRepository.save({candidate:candidate,job:job})
}

  // Lấy các job đã lưu theo candidate
  async getJobSaveCandidate (email:string) {
    
    const result = await this.saveCandidateJobRepository.createQueryBuilder("SaveCandidateJob")
    .innerJoinAndSelect("SaveCandidateJob.job", "Job")
    .innerJoinAndSelect("Job.types_jobs", "TypesJobs")
    .innerJoinAndSelect("TypesJobs.typejob", "Typejob")
    .innerJoinAndSelect("Job.address_company", "AddressCompany")
    .innerJoinAndSelect("Job.company", "Company")
    .innerJoinAndSelect("Job.salary_jobs","SalaryJobs")
    .innerJoinAndSelect("SalaryJobs.salary","Salary")
    .leftJoinAndSelect("SaveCandidateJob.candidate", "Candidate")
    .leftJoinAndSelect("Candidate.account_candidate_id", "Account")
    .where("Account.email = :email", { email: email })
    .getMany()
    return result
  }

  // check xem candidate đã lưu job hay chưa
  async checkSaveJob (email:string,job_id:string) {
    return await this.saveCandidateJobRepository.createQueryBuilder("SaveCandidateJob")
    .innerJoinAndSelect("SaveCandidateJob.job", "Job")
    .innerJoinAndSelect("SaveCandidateJob.candidate", "Candidate")
    .leftJoinAndSelect("Candidate.account_candidate_id", "Account")
    .where("Account.email = :email", { email: email })
    .andWhere("Job.id = :id", {id: job_id })
    .getOne()
  }
}