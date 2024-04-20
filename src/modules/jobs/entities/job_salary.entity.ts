import { Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Job } from "./job.entity";
import { Salary } from "src/modules/salary/entities/salary.entity";

@Entity('job_salary')
export class JobSalary {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @ManyToOne(type => Job, job => job.job_salary)
    @JoinColumn({name: 'job_id'})
    job_id: Job

    @ManyToOne(type => Salary, salary => salary.job_salary)
    @JoinColumn({name: 'salary_id'})
    salary_id: Salary
 }