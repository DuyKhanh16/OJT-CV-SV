import { Candidate } from "src/modules/candidates/entities/candidate.entity";
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Company } from "./company.entity";

@Entity('follower')
export class Follower {
    @PrimaryGeneratedColumn()
    id:string

    @ManyToOne(type => Candidate, candidate => candidate.follower)
    @JoinColumn({name: 'candidate_id'})
    candidate:Candidate

    @ManyToOne(type => Company, company => company.follower)
    company:Company
}