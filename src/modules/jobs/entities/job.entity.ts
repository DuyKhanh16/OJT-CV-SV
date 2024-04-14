import { Company } from "src/modules/companies/entities/company.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { LeversJobs } from "./levers_jobs.entity";
import { TypesJobs } from "./types_jobs.entity";
import { AddressCompany } from "src/modules/companies/entities/address_company.entity";

@Entity('job')
export class Job {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({type: 'varchar', length: 255})
    title: string;

    @Column({type: 'longtext'})
    description: string;


    @Column({type: 'longtext'})
    requirements: string;

    @Column({type: 'varchar', length: 255})
    salary: string;

    @Column({type:"varchar", length: 20})
    expire_at: string;

   

    @ManyToOne(type => Company, company => company.job)
    @JoinColumn({name: 'company_id'})
    company: Company;

    @OneToMany(type => LeversJobs, levers_jobs => levers_jobs.job)
    levers_jobs: LeversJobs[];

    @OneToMany(type => TypesJobs, types_jobs => types_jobs.jobs)
    types_jobs: TypesJobs[]

    @ManyToOne(type => AddressCompany, address_company => address_company.job)
    @JoinColumn({name: 'address_company_id'})
    address_company: AddressCompany
}
