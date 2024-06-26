import { Injectable } from '@nestjs/common';
import { CreateJobDto, applyJobDto, salaryDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from './entities/job.entity';
import { Repository } from 'typeorm';
import { TypejobService } from '../typejob/typejob.service';
import { LeveljobsService } from '../leveljobs/leveljobs.service';
import { LeversJobs } from './entities/levers_jobs.entity';
import { TypesJobs } from './entities/types_jobs.entity';
import { CompaniesService } from '../companies/companies.service';
import { log } from 'console';
// import { get } from 'http';
// import { async } from 'rxjs';
import { JobCandidates } from './entities/job_candidates.entity';
import { SalaryJobs } from './entities/salary_jobs.entity';
import { Candidate } from '../candidates/entities/candidate.entity';
import { StatusApplyEnum } from 'src/constants/enums/enum';
import { MailService } from 'src/mailer/mailer.service';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job) private jobRepository: Repository<Job>,
    @InjectRepository(JobCandidates) private jobCandidatesRepository: Repository<JobCandidates>,
    @InjectRepository(LeversJobs)
    private leversJobsRepository: Repository<LeversJobs>,
    @InjectRepository(SalaryJobs)
    private salaryJobsRepository: Repository<SalaryJobs>,
    @InjectRepository(TypesJobs)
    private typesJobsRepository: Repository<TypesJobs>,
    private readonly typejobService: TypejobService,
    private readonly leveljobService: LeveljobsService,
    private readonly companyService: CompaniesService,
    private readonly mailService: MailService

  ) {}
  //  tạo mới job
  async createNewJob(createJobDto: CreateJobDto, id: string) {
    // Lấy thông tin company theo id
    const company = await this.companyService.getCompanyById(id);
    // Lấy address-company theo id
    const address_company = await this.companyService.getAddressCompanyById(
      createJobDto.address_company_id,
    );
    // Tạo mới thông tin  job
    const newJob = await this.jobRepository
      .createQueryBuilder()
      .insert()
      .into(Job)
      .values({
        title: createJobDto.title,
        description: createJobDto.description,
        requirements: createJobDto.requirements,
        expire_at: createJobDto.expire_at,
        company: company,
        address_company: address_company,
        salary: createJobDto.salary,
      })
      .execute();
    log(newJob.raw.insertId);
    // lấy thông tin newJob
    const job = await this.jobRepository.findOneBy({ id: newJob.raw.insertId });
    // Lấy typejob theo id
    const typejob = await this.typejobService.getTypejobById(
      createJobDto.typejob_id,
    );
    //  tạo type_job
    await this.typesJobsRepository
      .createQueryBuilder()
      .insert()
      .into(TypesJobs)
      .values({ typejob: typejob, jobs: job })
      .execute();
    // Lấy leveljob theo id
    const leveljob = await this.leveljobService.getLeveljobById(
      createJobDto.leveljob_id,
    );
    // Tạo level_job
    await this.leversJobsRepository
      .createQueryBuilder()
      .insert()
      .into(LeversJobs)
      .values({ leveljob: leveljob, job: job })
      .execute();
    const salary_jobs = await this.salaryJobsRepository.createQueryBuilder()
    .insert()
    .into(SalaryJobs)
    .values({
      job:newJob.raw.insertId,
      salary: createJobDto.salary
    })
    .execute();
    return job;

  }

  //  update job
  async updateJob(updateJob: UpdateJobDto, id: string) {
    
    // lấy thông tin job update
    const [job] = await this.jobRepository.find({relations:['types_jobs','levers_jobs'] , where: { id: id } });
    const level_job_id =  job.levers_jobs[0].id;
    const type_job_id =  job.types_jobs[0].id;
    // Lấy address-company theo id
    const address_company = await this.companyService.getAddressCompanyById(
      updateJob.address_company_id,
    );
    // Lấy typejob theo id
    const typejob = await this.typejobService.getTypejobById(
      updateJob.typejob_id,
    );
    // Lấy leveljob theo id
    const leveljob = await this.leveljobService.getLeveljobById(
      updateJob.leveljob_id,
    );
    
    //  update Job
    await this.jobRepository
      .createQueryBuilder()
      .update(Job)
      .set({
        title: updateJob.title,
        description: updateJob.description,
        requirements: updateJob.requirements,
        salary: updateJob.salary,
        expire_at: updateJob.expire_at,
        address_company: address_company,
      })
      .where('id = :id', { id })
      .execute();
    // update type_job
    await this.typesJobsRepository
      .createQueryBuilder()
      .update(TypesJobs)
      .set({ typejob: typejob })
      .where('id = :id', {id:type_job_id})
      .execute();

    // update level_job
    await this.leversJobsRepository
      .createQueryBuilder()
      .update(LeversJobs)
      .set({ leveljob: leveljob })
      .where('id = :id', {id:level_job_id})
      .execute();
    return job;
  }

 

 //lay tat ca job dang tuyen dung
 async findAllLiveJobs() {
    const result = await this.jobRepository.createQueryBuilder("job")
    .innerJoinAndSelect("job.address_company", "address_company")
    .innerJoinAndSelect("job.company", "company")
    .innerJoinAndSelect("job.types_jobs", "types_jobs")
    .innerJoinAndSelect("types_jobs.typejob", "typejob")
    .innerJoinAndSelect("job.levers_jobs", "levers_jobs")
    .innerJoinAndSelect("levers_jobs.leveljob", "leveljob")
    .innerJoinAndSelect("job.salary_jobs", "salary_jobs")
    .innerJoinAndSelect("salary_jobs.salary", "salary")
    .where("job.status = 1")
    .orderBy("job.created_at", "DESC")
    .getMany()
    const result2 = await this.jobRepository.createQueryBuilder("job")
    
    .where("job.status = 0")
    .orderBy("job.created_at", "DESC")
    .getMany()
    return {
      result,result2
    }
 }

//  admin lấy jobs
async  findAllAdminJobs(query : any) {
  const {name,salary,status} = query
  console.log(status)
  const result = await this.jobRepository.createQueryBuilder("job")
  .innerJoinAndSelect("job.address_company", "address_company")
  .innerJoinAndSelect("job.company", "company")
  .innerJoinAndSelect("job.types_jobs", "types_jobs")
  .innerJoinAndSelect("types_jobs.typejob", "typejob")
  .innerJoinAndSelect("job.salary_jobs", "salary_jobs")
  .innerJoinAndSelect("salary_jobs.salary", "salary")
  if(status === "Tất cả" ){
    return result.getMany();
  }
  if(salary === "Tất cả" ){
    return result.getMany();
  }
  if(status === "1" || status === "0" ){
    result.andWhere("job.status = :status", { status })
  }
  if(salary === "1" || salary === "2" || salary === "3" || salary === "4" || salary === "5" || salary === "6"  ){
    result.andWhere("job.salary = :salary", { salary })
  }

  return result.getMany();

  // console.log(result)
  return result
}

// phantrang
async findAllFirstPaging() {
  const result = await this.jobRepository.createQueryBuilder("job")
  .innerJoinAndSelect("job.address_company", "address_company")
  .innerJoinAndSelect("job.company", "company")
  .innerJoinAndSelect("job.types_jobs", "types_jobs")
  .innerJoinAndSelect("types_jobs.typejob", "typejob")
  .innerJoinAndSelect("job.salary_jobs", "salary_jobs")
  .innerJoinAndSelect("salary_jobs.salary", "salary")
  .orderBy("job.created_at", "DESC")
  .limit(6)
  .offset(0)
  .getMany()
  return result
}

async findAllPaging(query) {
  const result = await this.jobRepository.createQueryBuilder("job")
  .innerJoinAndSelect("job.address_company", "address_company")
  .innerJoinAndSelect("job.company", "company")
  .innerJoinAndSelect("job.types_jobs", "types_jobs")
  .innerJoinAndSelect("types_jobs.typejob", "typejob")
  .innerJoinAndSelect("job.salary_jobs", "salary_jobs")
  .innerJoinAndSelect("salary_jobs.salary", "salary")
  .orderBy("job.created_at", "DESC")
  .limit(6)
  .offset((query.page - 1) * 6)
  .getMany()
  return result
}

//  lấy job theo company
 async getJobByIdCompany(id: string) {
    const result = await this.jobRepository.createQueryBuilder("job")
    .innerJoinAndSelect("job.address_company", "address_company")
    .innerJoinAndSelect("job.types_jobs", "types_jobs")
    .innerJoinAndSelect("job.levers_jobs", "levers_jobs")
    .leftJoinAndSelect("types_jobs.typejob", "typejob")
    .leftJoinAndSelect("levers_jobs.leveljob", "leveljob")
    .where("job.company.id = :id", { id })
    .getMany()
    return result;
 }


 //lay tat ca job dang tuyen dung cua cty 
async getJobsForCompany(email: string,status :any) {
  
  // công ty selec trạng thái cua job đang tuyển dụng
  if(status.status === "1"){
    console.log(status,"đã ăn vào dây122222222222222222222")
    const result = await this.jobRepository
    .createQueryBuilder("job")
    .innerJoinAndSelect("job.company", "company")
    .innerJoinAndSelect("company.account_company_id", "account")
    .innerJoinAndSelect("job.address_company", "address_company")
    .innerJoinAndSelect("job.types_jobs", "types_jobs")
    .innerJoinAndSelect("types_jobs.typejob", "typejob")
    .innerJoinAndSelect("job.levers_jobs", "levers_jobs")
    .innerJoinAndSelect("levers_jobs.leveljob", "leveljob")
    .where("account.email = :email", { email })
    .andWhere("job.status = 1")
    .orderBy("job.created_at", "DESC")
    .getMany();
    // console.log(result)
    return result;
  }

  // công ty lấy các job đã ngừng tuyển dụng
  if(status.status === "0"){
    console.log(status,"đã ăn vào 333333333333")
    const result = await this.jobRepository
    .createQueryBuilder("job")
    .innerJoinAndSelect("job.company", "company")
    .innerJoinAndSelect("company.account_company_id", "account")
    .innerJoinAndSelect("job.address_company", "address_company")
    .innerJoinAndSelect("job.types_jobs", "types_jobs")
    .innerJoinAndSelect("types_jobs.typejob", "typejob")
    .innerJoinAndSelect("job.levers_jobs", "levers_jobs")
    .innerJoinAndSelect("levers_jobs.leveljob", "leveljob")
    .where("account.email = :email", { email })
    .andWhere("job.status = 0")
    .orderBy("job.created_at", "DESC")
    .getMany();
    console.log(result)
    return result;
  }

  // lấy tất cả job
  if(status.status === "2"){
    console.log(status,"đã ăn vào 444444444444")
    const result = await this.jobRepository
    .createQueryBuilder("job")
    .innerJoinAndSelect("job.company", "company")
    .innerJoinAndSelect("company.account_company_id", "account")
    .innerJoinAndSelect("job.address_company", "address_company")
    .innerJoinAndSelect("job.types_jobs", "types_jobs")
    .innerJoinAndSelect("types_jobs.typejob", "typejob")
    .innerJoinAndSelect("job.levers_jobs", "levers_jobs")
    .innerJoinAndSelect("levers_jobs.leveljob", "leveljob")
    .where("account.email = :email", { email })
    .orderBy("job.created_at", "DESC")
    .getMany();
    // console.log(result)
    return result;
  }

  // công ty search theo tên công việc
  if(status.key){
    console.log(status,"111111155555555555555555")
    const result = await this.jobRepository
    .createQueryBuilder("job")
    .innerJoinAndSelect("job.company", "company")
    .innerJoinAndSelect("company.account_company_id", "account")
    .innerJoinAndSelect("job.address_company", "address_company")
    .innerJoinAndSelect("job.types_jobs", "types_jobs")
    .innerJoinAndSelect("types_jobs.typejob", "typejob")
    .innerJoinAndSelect("job.levers_jobs", "levers_jobs")
    .innerJoinAndSelect("levers_jobs.leveljob", "leveljob")
    .where("account.email = :email", { email })
    .andWhere("job.title like :key", { key: `%${status.key}%` })
    .orderBy("job.created_at", "DESC")
    .getMany();
    // console.log(result)
    return result;
  }

  const result = await this.jobRepository
    .createQueryBuilder("job")
    .innerJoinAndSelect("job.company", "company")
    .innerJoinAndSelect("company.account_company_id", "account")
    .innerJoinAndSelect("job.address_company", "address_company")
    .innerJoinAndSelect("job.types_jobs", "types_jobs")
    .innerJoinAndSelect("types_jobs.typejob", "typejob")
    .innerJoinAndSelect("job.levers_jobs", "levers_jobs")
    .innerJoinAndSelect("levers_jobs.leveljob", "leveljob")
    .where("account.email = :email", { email })
    .orderBy("job.created_at", "DESC")
    .getMany();
    console.log(result,"6666666666666666")
  return result;
}

//lay tat ca candidate theo id job (Hoang viet)
async getCandidatesbyIdJob(id: string) {
  // const result = await this.jobRepository
  //   .createQueryBuilder("job")
  //   .innerJoinAndSelect("job.job_candidates", "job_candidates")
  //   .innerJoinAndSelect("job_candidates.candidate_id", "candidate")
  //   .innerJoinAndSelect("candidate.account_candidate_id", "account")
  //   .where("job.id = :id", { id })
  //   .getMany();
  // console.log(result)
  const result= await this.jobCandidatesRepository.createQueryBuilder("job_candidates")
  .innerJoinAndSelect("job_candidates.candidate_id", "candidate")
  .innerJoinAndSelect("candidate.account_candidate_id", "account")
  .innerJoinAndSelect("job_candidates.job_id", "job")
  .where("job_candidates.job_id.id = :id", { id })
  .getMany();
  return result;
}

//lay tat ca candidate ung tuyen cty (Hoang viet)
async getCandidatesApplyingforCompany(email: string) {
  const result = await this.jobRepository
    .createQueryBuilder("job")
    .innerJoinAndSelect("job.job_candidates", "job_candidates")
    .innerJoinAndSelect("job_candidates.candidate_id", "candidate")
    .innerJoinAndSelect("job.company", "company")
    .innerJoinAndSelect("company.account_company_id", "account")
      .where("account.email = :email", { email: email})
    .getMany();
  console.log(result)
  return result;
}

// lấy job theo Id(jobdetail)
async getJobById(id: string) {
  return await this.jobRepository.createQueryBuilder("job")
  .innerJoinAndSelect("job.address_company", "address_company")
  .innerJoinAndSelect("job.company", "company")
    .innerJoinAndSelect("job.types_jobs", "types_jobs")
    .innerJoinAndSelect("job.levers_jobs", "levers_jobs")
    .innerJoinAndSelect("types_jobs.typejob", "typejob")
    .innerJoinAndSelect("levers_jobs.leveljob", "leveljob")
    .innerJoinAndSelect("job.salary_jobs", "salary_jobs")
    .innerJoinAndSelect("salary_jobs.salary", "salary")
    .where("job.id = :id", { id })
    .getOne()
}

// delete job
async deleteoneJob(id: string) {
  const result = await this.jobRepository.find({relations: ["types_jobs","levers_jobs","salary_jobs"] ,where: { id: id }})
  console.log(result);
  await this.leversJobsRepository.remove(result[0].levers_jobs)
  await this.typesJobsRepository.remove(result[0].types_jobs)
  await this.salaryJobsRepository.remove(result[0].salary_jobs)
  // await this.salaryJobsRepository.createQueryBuilder("salary_jobs").delete().from(SalaryJobs).where("job_id = :id", { id: id }).execute();
  // await this.salaryJobsRepository.remove(result[0].salary_jobs)
  return await this.jobRepository.delete(id);
 }

//  update status job
async updateStatusJob(id: string, status: number) {
  return await this.jobRepository
    .createQueryBuilder()
    .update(Job)
    .set({ status: status })
    .where("id = :id", { id })
    .execute();
}

async applyJob(body:applyJobDto) {
  const result = await this.jobCandidatesRepository.createQueryBuilder("job_candidates")
  .insert()
  .into(JobCandidates)
  .values({
    candidate_id: body.candidate_id,
    job_id: body.job_id,
    content: body.content,
    cv_url: body.cv_url
  })
  .execute()
  // console.log(result)
  return result
}

 async getJobAppliedCandidates(email: string) {
  const result = await this.jobCandidatesRepository
    .createQueryBuilder("job_candidates")
    .innerJoinAndSelect("job_candidates.job_id", "job")
    .innerJoinAndSelect("job_candidates.candidate_id", "candidate")
    .innerJoinAndSelect("candidate.account_candidate_id", "account")
    .innerJoinAndSelect("job.company", "company")
    .innerJoinAndSelect("company.address_company", "address_company")
    .innerJoinAndSelect("job.types_jobs", "types_jobs")
    .innerJoinAndSelect("types_jobs.typejob", "typejob")
    .innerJoinAndSelect("job.levers_jobs", "levers_jobs")
    .innerJoinAndSelect("levers_jobs.leveljob", "leveljob")
    .innerJoinAndSelect("job.salary_jobs", "salary_jobs")
    .innerJoinAndSelect("salary_jobs.salary", "salary")
    .where("account.email = :email", { email: email})
    .getMany();
  // console.log(result)
  return result;
}
async getJobAppliedCandidatesbyId(email: string, idJob: string) {
  const result = await this.jobCandidatesRepository
    .createQueryBuilder("job_candidates")
    .innerJoinAndSelect("job_candidates.job_id", "job")
    .innerJoinAndSelect("job_candidates.candidate_id", "candidate")
    .innerJoinAndSelect("candidate.account_candidate_id", "account")
    .innerJoinAndSelect("job.company", "company")
    .innerJoinAndSelect("company.address_company", "address_company")
    .innerJoinAndSelect("job.types_jobs", "types_jobs")
    .innerJoinAndSelect("types_jobs.typejob", "typejob")
    .innerJoinAndSelect("job.levers_jobs", "levers_jobs")
    .innerJoinAndSelect("levers_jobs.leveljob", "leveljob")
    .innerJoinAndSelect("job.salary_jobs", "salary_jobs")
    .innerJoinAndSelect("salary_jobs.salary", "salary")
    .where("account.email = :email", { email: email})
    .andWhere("job.id = :idJob", { idJob: idJob})
    .getMany();
  return result;
}

// từ chối ứng viên
  async cancelCandidate (id: string,nameCompany: string) {
    const candidaet= await this.jobCandidatesRepository.createQueryBuilder("job_candidates")
    .innerJoinAndSelect("job_candidates.candidate_id", "candidate")
    .leftJoinAndSelect("candidate.account_candidate_id", "account")
    .where("job_candidates.id = :id", { id })
    .getOne()
    await this.jobCandidatesRepository.update({id}, {status: StatusApplyEnum.CANCEL})
    const email= candidaet.candidate_id.account_candidate_id.email
    const name=candidaet.candidate_id.name
    const subject = 'THƯ CẢM ƠN & THÔNG BÁO KẾT QUẢ CV'
    const Company = nameCompany
    console.log(email,"email ứng viên")
    await this.mailService.sendMailCancel(email, subject, name,Company)
  }

  async searchJob(name:string,location:string,leveljob:string,salary:string) {
    // console.log(name,location,leveljob,salary)
  const result = await this.jobRepository
    .createQueryBuilder("job")
    .innerJoinAndSelect("job.company", "company")
    .innerJoinAndSelect("job.types_jobs", "types_jobs")
    .innerJoinAndSelect("job.levers_jobs", "levers_jobs")
    .leftJoinAndSelect("types_jobs.typejob", "typejob")
    .leftJoinAndSelect("levers_jobs.leveljob", "leveljob")
    .innerJoinAndSelect("job.address_company", "address_company")
    .innerJoinAndSelect("job.salary_jobs", "salary_jobs")
    .innerJoinAndSelect("salary_jobs.salary", "salary")   
    .where("job.title like :search", { search: `%${name}%` })
    if(location){
      result.andWhere("address_company.address like :location", { location: `%${location}%`})
    }
    if(salary){
      result.andWhere("salary.id = :salary", { salary })
    }
    if(leveljob){
      result.andWhere("leveljob.id = :leveljob", { leveljob })
    }
    return result.getMany();
  // console.log(result)
}

// update interview_day
  async updateInterview(id: string, interview_day: string,interview_adress : string,nameCompany :string,emailCompany :string) {
    const candidaet= await this.jobCandidatesRepository.createQueryBuilder("job_candidates")
    .innerJoinAndSelect("job_candidates.candidate_id", "candidate")
    .leftJoinAndSelect("candidate.account_candidate_id", "account")
    .where("job_candidates.id = :id", { id })
    .getOne()
  
    const email= candidaet.candidate_id.account_candidate_id.email
    const name=candidaet.candidate_id.name
    await this.jobCandidatesRepository.update({id}, {interview_day:interview_day,status: StatusApplyEnum.APPLY})
    const subject = 'Thư mời phỏng vấn'
    const day=interview_day
    const address =interview_adress
    const Company = nameCompany
    const emailcompany = emailCompany
    return await this.mailService.sendMailInterview(email, subject, name,day,address,Company,emailcompany)    
  }
  //  laays job theo entity (để join bảng)
  async getJobByIdTypeEntity(id: string) {
    return this.jobRepository.findOneBy({id:id})
  }

  // lấy dữ liệu của chart admin
  async getchart() {
    const result = await this.jobCandidatesRepository.createQueryBuilder("job_candidates")
    .select("job_candidates.status", "status")
    .addSelect("COUNT(*)", "count")
    .groupBy("job_candidates.status")
    .execute()
    console.log(result)
    return result;
  }
}