import { LeversJobs } from "src/modules/jobs/entities/levers_jobs.entity";
import { SkillsCandidate } from "src/modules/skills_candidate/entities/skills_candidate.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('leveljob')
export class Leveljob {
    @PrimaryGeneratedColumn()
    id: string;
    @Column({type: 'varchar', length: 255})
    name: string;
    
    lever_job: LeversJobs[]
    @OneToMany(()=>SkillsCandidate, (skills_candidate) => skills_candidate.leveljob_id)
    skills_candidate: SkillsCandidate[]
}
