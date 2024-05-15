import { SalaryJobs } from "src/modules/jobs/entities/salary_jobs.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('salary')
export class Salary { 
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column({type: 'varchar', length: 55}) 
    name: string;

    @OneToMany(type => SalaryJobs, salary_jobs => salary_jobs.salary)
    salary_jobs: SalaryJobs
}