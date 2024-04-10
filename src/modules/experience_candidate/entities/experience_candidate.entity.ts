import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('experience_candidate')
export class ExperienceCandidate {
    @PrimaryGeneratedColumn()
    id: string;
}
