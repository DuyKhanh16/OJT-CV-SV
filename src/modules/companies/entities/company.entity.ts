import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AddressCompany } from "./address_company.entity";
import { Job } from "src/modules/jobs/entities/job.entity";
import { Typecompany } from "src/modules/typecompany/entities/typecompany.entity";
import { Account } from "src/modules/account/entities/account.entity";

@Entity('company')
export class Company {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({type: 'varchar', length: 255})
    name: string;

    @Column({type: 'varchar', length: 255})
    logo: string;

    @Column({type: 'varchar', length: 255})
    website: string;

    @Column({type: 'varchar', length: 255})
    link_facebook: string;

    @Column({type: 'varchar', length: 255})
    link_linkedin: string;

    @Column({type: 'int'})
    followers: number;

    @Column({type: 'int'})
    size: number;

    @Column({type:'longtext'})
    description: string;

    @Column({type:'date'})
    created_at: Date;

    @Column({type:'date'})
    updated_at: Date;

    @OneToMany(type => AddressCompany, address_company => address_company.company)
    address_company: AddressCompany[]

    @OneToMany(type => Job, job => job.company)

    job: Job[]

    @ManyToOne(type => Typecompany, typecompany => typecompany.company)
    @JoinColumn({name: 'typeCompany_id'})
    typeCompany_id: Typecompany

    @ManyToOne(type => Account, account => account.company)
    @JoinColumn({name: 'account_company_id'})
    account_company_id: Account
}
