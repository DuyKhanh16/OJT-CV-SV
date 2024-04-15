import { Candidate } from "src/modules/candidates/entities/candidate.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('experience_candidate')
export class ExperienceCandidate {
    @PrimaryGeneratedColumn("increment")
    id: string;

    @Column({
        type: "varchar",
        length: 255,
        nullable: true,

    })
    company: string;

    @Column({
        type: "varchar",
        length: 255,
        nullable: true,

    })
    position: string;

    @Column({
        type: "varchar",
        length: 20,
        nullable: true,

    })
    start_at: string;

    @Column({
        type: "varchar",
        length: 20,
        nullable: true,

    })
    end_at: string;

    @Column({
        type: "varchar",
        length: 255,
        nullable: true,

    })
    info: string;
    
    @Column({
        type:"int",
        default: 1
    })
    status: number;
    // @Column({
    //     type:"date",
    // })
    // created_at: string; 
    
    // @Column({
    //     type:"date",
    // })
    // updated_at: string; 

    @ManyToOne(() => Candidate, (candidate) => candidate.id)
    @JoinColumn({ name: 'candidate_id' })
    candidate_id: Candidate;
}
