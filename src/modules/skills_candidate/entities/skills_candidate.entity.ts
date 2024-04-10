import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('skills_candidate')
export class SkillsCandidate {
    @PrimaryGeneratedColumn()
    id: string;
}
