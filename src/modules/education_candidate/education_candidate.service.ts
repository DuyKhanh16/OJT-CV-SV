import { Injectable } from '@nestjs/common';
import { CreateEducationCandidateDto } from './dto/create-education_candidate.dto';
import { UpdateEducationCandidateDto } from './dto/update-education_candidate.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EducationCandidate } from './entities/education_candidate.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EducationCandidateService {
  constructor(
    @InjectRepository(EducationCandidate) private educationCandidateRepository: Repository<EducationCandidate>,
  ) {}

  async findEducations(email:string) {
    const result = await this.educationCandidateRepository.createQueryBuilder()
    .innerJoinAndSelect("EducationCandidate.candidate_id","Candidate")
    .innerJoinAndSelect("Candidate.account_candidate_id","Account")
    .where("Account.email = :email", { email: email })
    .getMany();
    console.log(result)
    return result
  }

  // thêm thông tin học vấn
  async createNewEducation(candidate_id:string|any, name_education:string, major:string, start_at: string, end_at: string, info: string) {
    console.log(candidate_id,name_education,major,start_at,end_at,info)
    const result = await this.educationCandidateRepository.createQueryBuilder()
    .insert()
    .into(EducationCandidate)
    .values({
      candidate_id:candidate_id,
      name_education:name_education,
      major:major,
      start_at:start_at,
      end_at:end_at,
      info:info
    })
    .execute();
    console.log(result)
    return 'create success';
  }

  //update thông tin học vấn candidate
  async updateNewEducation(id:string,candidate_id:any, name_education:string, major:string, started_at: string, end_at: string, info: string) {
    const result = await this.educationCandidateRepository.createQueryBuilder()
    .update(EducationCandidate)
    .set({
      name_education:name_education,
      major:major,
      start_at:started_at,
      end_at:end_at,
      info:info
    })
    .where("id = :id", { id: id })
    .execute();
    console.log(result)
    return 'update success';
  }
  async removeEdication(id: string) {
    const result = await this.educationCandidateRepository.createQueryBuilder()
    .delete()
    .from(EducationCandidate)
    .where("id = :id", { id: id })
    .execute();
    console.log(result)
    return 'delete success';
  }

  
}
