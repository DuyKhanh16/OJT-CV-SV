import { Candidate } from "src/modules/candidates/entities/candidate.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('job_candidates')
export class JobCandidates {
    @PrimaryGeneratedColumn("increment")
    id: string;

    @Column({
        type:"int",
        default: 1
    })
    status: number;
    @Column({
        type:"varchar",
        length: 255

    })
    cv_url: string;
    @Column({
        type:"varchar",
        length: 255

    })
    content: string;

    @ManyToOne(() => Candidate, (candidate) => candidate.id)
    @JoinColumn({ name: 'candidate_id' })
    candidate_id: Candidate;
}