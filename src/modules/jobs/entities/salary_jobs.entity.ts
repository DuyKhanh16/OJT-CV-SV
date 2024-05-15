import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Job } from "./job.entity";
import { Salary } from "src/modules/salary/entities/salary.entity";

@Entity("salary_jobs")
export class SalaryJobs { 

    @PrimaryGeneratedColumn("increment")
    id: number;

    @ManyToOne(type => Job, job => job.salary_jobs,{onDelete: 'CASCADE'})
    @JoinColumn({name: 'job_id'})
    job: Job

    @ManyToOne(type => Salary, salary => salary.salary_jobs)
    @JoinColumn({name: 'salary_id'})
    salary: Salary
}