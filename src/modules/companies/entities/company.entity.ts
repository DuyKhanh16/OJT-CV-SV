import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AddressCompany } from "./address_company.entity";
import { Job } from "src/modules/jobs/entities/job.entity";
import { Typecompany } from "src/modules/typecompany/entities/typecompany.entity";
import { Account } from "src/modules/account/entities/account.entity";

@Entity('company')
export class Company {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({type: 'varchar', length: 255, 
    nullable:true})
    name: string;

    @Column({type: 'varchar', length: 255
    , nullable:true})
    logo: string;

    @Column({type: 'varchar', length: 255
    , nullable:true})
    website: string;

    @Column({type: 'varchar', length: 255 
    , nullable:true})
    link_facebook: string;

    @Column({type: 'varchar', length: 255
    , nullable:true})
    link_linkedin: string;

    @Column({type: 'varchar', length: 255
    , nullable:true})
    link_github: string

    @Column({type: 'int'
    , nullable:true})
    followers: number;

    @Column({type: 'int'
    , nullable:true})
    size: number;

    @Column({type:'longtext'
    , nullable:true})
    description: string;

    @Column({type: 'varchar', length: 11})
    phone: string;

    @Column({type: 'varchar', length: 255})
    emailCompany: string;

    // @Column({type: 'varchar', length: 255})
    // addressRegister: string;

    @Column({type: 'longtext'
    , nullable:true})
    policy:string

    @Column({type:'date'
    , nullable:true})
    created_at: Date;

    @Column({type:'date'
    , nullable:true})
    updated_at: Date;


    @OneToMany(type => AddressCompany, address_company => address_company.company_id)
    address_company: AddressCompany[]

    @OneToMany(type => Job, job => job.company)
    job:Job[]

    @ManyToOne(type => Typecompany, typecompany => typecompany.company)
    @JoinColumn({name: 'typeCompany_id'})
    typeCompany_id: Typecompany

    @ManyToOne(type => Account, account => account.company)
    @JoinColumn({name: 'account_company_id'})
    account_company_id: Account
}
