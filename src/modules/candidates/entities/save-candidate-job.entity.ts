import { Job } from "src/modules/jobs/entities/job.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Candidate } from "./candidate.entity";

@Entity('save-candidate-job')
export class SaveCandidateJob {
    @PrimaryGeneratedColumn()
    id: number;
    
    @ManyToOne(type => Job, job => job.savecandidatejob)
    @JoinColumn({name: 'job_id'})
    job: Job

    @ManyToOne(type => Candidate, candidate => candidate.savecandidatejob)
    @JoinColumn({name: 'candidate_id'})
    candidate:Candidate
}