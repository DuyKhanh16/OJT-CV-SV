import { JobSalary } from "src/modules/jobs/entities/job_salary.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('salary')
export class Salary { 
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column({type: 'varchar', length: 55}) 
    name: string;

    @OneToMany(type => JobSalary, job_salary => job_salary.salary_id)
    job_salary: JobSalary[]
}