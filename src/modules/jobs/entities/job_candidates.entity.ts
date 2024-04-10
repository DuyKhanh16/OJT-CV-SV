import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('job_candidates')
export class JobCandidates {
    @PrimaryGeneratedColumn()
    id: string;
}