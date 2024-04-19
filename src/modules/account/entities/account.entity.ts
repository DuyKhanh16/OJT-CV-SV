import { Candidate } from "src/modules/candidates/entities/candidate.entity";
import { Company } from "src/modules/companies/entities/company.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('account')
export class Account {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({type: 'varchar', length: 255})
    email: string;

    @Column({type: 'varchar', length: 255})
    password: string;
    
    @Column({type: 'int'})
    role : number

    @Column({type: 'int', default: 1})
    status : number

    @OneToMany(type => Company, company => company.account_company_id)
    company: Company[]

    @OneToMany(type => Candidate, candidate => candidate.account_candidate_id)
    candidate: Candidate
}
