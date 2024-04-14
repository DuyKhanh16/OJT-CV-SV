import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Company } from "./company.entity";
import { Localtion } from "src/modules/localtion/entities/localtion.entity";
import { Job } from "src/modules/jobs/entities/job.entity";

@Entity('address_company')
export class AddressCompany {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({type: 'varchar', length: 255})
    address: string;

    @Column({type: 'varchar', length: 255})
    map_url: string;

    @Column({type:'varchar', length: 20})
    created_at: string;

    @ManyToOne(type => Company, company => company.address_company)
    @JoinColumn({name: 'company_id'})
    company: Company

    @ManyToOne(type => Localtion, localtion => localtion.address_company)
    @JoinColumn({name: 'localtion_id'})
    localtion: Localtion

    @OneToMany(type => Job, job => job.address_company)
    job: Job

}