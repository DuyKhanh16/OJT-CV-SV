import { Candidate } from "src/modules/candidates/entities/candidate.entity";
import { Company } from "src/modules/companies/entities/company.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('notification')
export class Notification {
    @PrimaryGeneratedColumn()
    id:string
    
    @Column({type: 'varchar', length: 255})
    title: string;

    @Column({type: 'int',default:0})
    status:number
    
    @ManyToOne(type => Candidate, candidate => candidate.notification)
    @JoinColumn({name: 'candidate_id'})
    candidate:Candidate

    @ManyToOne(type => Company, company => company.notification)
    @JoinColumn({name: 'company_id'})
    company:Company

}