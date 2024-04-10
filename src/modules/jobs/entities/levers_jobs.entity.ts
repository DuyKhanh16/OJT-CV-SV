import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Job } from "./job.entity";
import { Leveljob } from "src/modules/leveljobs/entities/leveljob.entity";

@Entity("levers_jobs")
export class LeversJobs {
    @PrimaryGeneratedColumn()
    id: string;

    @ManyToOne(type => Job, job => job.levers_jobs)
    @JoinColumn({name: 'job_id'})
    job: Job

    @ManyToOne(type => Leveljob, leveljob => leveljob.lever_job)
    @JoinColumn({name: 'level_id'})
    leveljob: Leveljob
}