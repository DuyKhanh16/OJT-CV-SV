import { Candidate } from "src/modules/candidates/entities/candidate.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('certificate_candidate')
export class CertificateCandidate {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({
        type: "varchar",
        length: 255
    })
    name: string;

    @Column({
        type: "varchar",
        length: 255
    })
    organization: string;
    @Column({
        type: "date",
    })
    start_at: string;

    @Column({
        type: "date",
    })
    end_at: string;

    @Column({
        type: "varchar",
        length: 255
    })
    info: string;
    
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
}
