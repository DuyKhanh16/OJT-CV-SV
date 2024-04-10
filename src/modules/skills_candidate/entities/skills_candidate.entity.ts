import { Candidate } from "src/modules/candidates/entities/candidate.entity";
import { Leveljob } from "src/modules/leveljobs/entities/leveljob.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('skills_candidate')
export class SkillsCandidate {
    @PrimaryGeneratedColumn("increment")
    id: string;

    @Column({
        type: "varchar",
        length: 55
    })
    name: string;

    @Column({
        type:"int",
        default: 1
    })
    status: number;

    @Column({
        type:"date",
    })
    created_at: string; 
    
    @Column({
        type:"date",
    })
    updated_at: string; 

    @ManyToOne(() => Candidate, (candidate) => candidate.id)
    @JoinColumn({ name: 'candidate_id' })
    candidate_id: Candidate;

    @ManyToOne(() => Leveljob, (leveljob) => leveljob.id)
    @JoinColumn({ name: 'leveljob_id' })
    leveljob_id: Leveljob;
    

}
