import { Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
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
import { get } from 'http';
import { async } from 'rxjs';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job) private jobRepository: Repository<Job>,
    @InjectRepository(LeversJobs)
    private leversJobsRepository: Repository<LeversJobs>,
    @InjectRepository(TypesJobs)
    private typesJobsRepository: Repository<TypesJobs>,
    private readonly typejobService: TypejobService,
    private readonly leveljobService: LeveljobsService,
    private readonly companyService: CompaniesService,
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
        salary: createJobDto.salary,
        expire_at: createJobDto.expire_at,
        company: company,
        address_company: address_company,
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
    return job;

  }

  //  update job
  async updateJob(updateJob: UpdateJobDto, id: string) {
    // lấy thông tin job update
    const job = await this.jobRepository.findOneBy({ id: id });
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
      .where('id = :id', { id })
      .execute();
    // update level_job
    await this.leversJobsRepository
      .createQueryBuilder()
      .update(LeversJobs)
      .set({ leveljob: leveljob })
      .where('id = :id', { id })
      .execute();
    return job;
  }

 

 //lay tat ca job dang tuyen dung
 async findAllLiveJobs() {
    const result = await this.jobRepository.createQueryBuilder("job")
    .innerJoinAndSelect("job.address_company", "address_company")
    .innerJoinAndSelect("job.company", "company")
    .select("job")
    .where("job.status = 1")
    .orderBy("job.created_at", "DESC")
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


 //lay tat ca job dang tuyen dung cua cty (Hoang viet)
async getJobsForCompany(email: string) {
  const result = await this.jobRepository
    .createQueryBuilder("job")
    .innerJoinAndSelect("job.company", "company")
    .innerJoinAndSelect("company.account_company_id", "account")
    // .innerJoinAndSelect("job.address_company", "address_company")
    // .innerJoinAndSelect("job.types_jobs", "types_jobs")
    // .innerJoinAndSelect("types_jobs.typejob", "typejob")
    // .innerJoinAndSelect("job.levers_jobs", "levers_jobs")
    // .innerJoinAndSelect("levers_jobs.leveljob", "leveljob")
    .where("account.email = :email", { email })
    .orderBy("job.created_at", "DESC")
    .getMany();
    console.log(result)
  return result;
}

// lấy job theo Id(jobdetail)
async getJobById(id: string) {
  return await this.jobRepository.createQueryBuilder("job")
  .innerJoinAndSelect("job.address_company", "address_company")
    .innerJoinAndSelect("job.types_jobs", "types_jobs")
    .innerJoinAndSelect("job.levers_jobs", "levers_jobs")
    .leftJoinAndSelect("types_jobs.typejob", "typejob")
    .leftJoinAndSelect("levers_jobs.leveljob", "leveljob")
    .where("job.id = :id", { id })
    .getOne()
}

// delete job
async deleteoneJob(id: string) {
  const result = await this.jobRepository.find({relations: ["types_jobs","levers_jobs"] ,where: { id: id }})
  console.log(result);
  await this.leversJobsRepository.remove(result[0].levers_jobs)
  await this.typesJobsRepository.remove(result[0].types_jobs)
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
}
