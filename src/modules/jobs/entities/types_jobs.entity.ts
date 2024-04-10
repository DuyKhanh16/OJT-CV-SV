import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Job } from "./job.entity";
import { Typejob } from "src/modules/typejob/entities/typejob.entity";

@Entity("types_jobs")
export class TypesJobs {
    @PrimaryGeneratedColumn()
    id: string;

    @ManyToOne(type => Job, job => job.types_jobs)
    @JoinColumn({name: 'job_id'})
    jobs: Job

    @ManyToOne(type => Typejob, typejob => typejob.types_jobs)
    typejob:Typejob
}