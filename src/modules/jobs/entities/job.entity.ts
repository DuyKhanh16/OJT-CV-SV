import { Company } from "src/modules/companies/entities/company.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { LeversJobs } from "./levers_jobs.entity";
import { TypesJobs } from "./types_jobs.entity";

@Entity('job')
export class Job {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({type: 'varchar', length: 255})
    title: string;

    @Column({type: 'longtext'})
    description: string;

    @Column({type: 'varchar', length: 255})
    salary: string;

    @Column({type: 'date'})
    expire_at: Date;

    @Column({type:'date'})
    created_at: Date;

    @Column({type:'date'})
    updated_at: Date;

    @ManyToOne(type => Company, company => company.job)
    @JoinColumn({name: 'company_id'})
    company: Company;

    @OneToMany(type => LeversJobs, levers_jobs => levers_jobs.job)
    levers_jobs: LeversJobs[];

    @OneToMany(type => TypesJobs, types_jobs => types_jobs.jobs)
    types_jobs: TypesJobs[]
}
