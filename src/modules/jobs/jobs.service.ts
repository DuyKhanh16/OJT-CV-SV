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

@Injectable()
export class JobsService {
 constructor(
  @InjectRepository(Job) private jobRepository: Repository<Job>,
  @InjectRepository(LeversJobs) private leversJobsRepository: Repository<LeversJobs>,
  @InjectRepository(TypesJobs) private typesJobsRepository: Repository<TypesJobs>,
  private readonly typejobService: TypejobService,
  private readonly leveljobService: LeveljobsService,
  private readonly companyService: CompaniesService
  
 ) {}
//  tạo mới job
 async createNewJob(createJobDto: CreateJobDto, id: string) {
    // Lấy thông tin company theo id
    const company = await this.companyService.getCompanyById(id); 
    // Lấy address-company theo id
    const address_company= await this.companyService.getAddressCompanyById(createJobDto.address_company_id);
    // Tạo mới thông tin  job
    const newJob= await this.jobRepository.createQueryBuilder().insert().into(Job).values({title:createJobDto.title,description:createJobDto.description,requirements:createJobDto.requirements,salary:createJobDto.salary,expire_at:createJobDto.expire_at,company:company,address_company:address_company}).execute();
   log(newJob.raw.insertId);
    // lấy thông tin newJob
    const job = await this.jobRepository.findOneBy({id:newJob.raw.insertId});    
   // Lấy typejob theo id
   const typejob = await this.typejobService.getTypejobById(createJobDto.typejob_id);
    //  tạo type_job
    await this.typesJobsRepository.createQueryBuilder().insert().into(TypesJobs).values({typejob:typejob,jobs:job}).execute();
    // Lấy leveljob theo id
    const leveljob = await this.leveljobService.getLeveljobById(createJobDto.leveljob_id);
    // Tạo level_job
    await this.leversJobsRepository.createQueryBuilder().insert().into(LeversJobs).values({leveljob:leveljob,job:job}).execute();
    return job;
 }
}
