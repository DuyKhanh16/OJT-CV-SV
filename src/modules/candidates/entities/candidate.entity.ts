import { CertificateCandidate } from "src/modules/certificate_candidate/entities/certificate_candidate.entity";
import { EducationCandidate } from "src/modules/education_candidate/entities/education_candidate.entity";
import { ExperienceCandidate } from "src/modules/experience_candidate/entities/experience_candidate.entity";
import { JobCandidates } from "src/modules/jobs/entities/job_candidates.entity";
import { ProjectCandidate } from "src/modules/project_candidate/entities/project_candidate.entity";
import { SkillsCandidate } from "src/modules/skills_candidate/entities/skills_candidate.entity";
import { Column, Entity,  OneToMany,  PrimaryGeneratedColumn } from "typeorm";

@Entity('candidate')
export class Candidate {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    name: string;

    @Column({
        type: 'int',
        default: 1
    })
    status: number;

    @Column({
       type:"date",
    })
    birthday: string;

    @Column({
        type:"varchar",
        length: 255
    })
    address: string;

    @Column({
        type:"varchar",
        length: 20
    })
    phone: string;

    @Column({
        type:"int",
    })
    gender: number;

    @Column({
        type:"varchar",
        length: 100
    })
    link_fb: string;

    @Column({
        type:"varchar",
        length: 100
    })
    link_linkedin: string;

    @Column({
        type:"varchar",
        length: 100
    })
    link_git: string;

    @Column({
        type:"date",
    })
    created_at: string; 

    @Column({
        type:"date",
    })
    updated_at: string; 

    @OneToMany(() => ProjectCandidate, (project_candidate) => project_candidate.candidate_id)
    project_candidate: ProjectCandidate[]

    @OneToMany(() => SkillsCandidate, (skills_candidate) => skills_candidate.candidate_id)
    skills_candidate: SkillsCandidate[]

    @OneToMany(() => EducationCandidate, (education_candidate) => education_candidate.candidate_id)
    education_candidate: EducationCandidate[]

    @OneToMany(() => ExperienceCandidate, (experience_candidate) => experience_candidate.candidate_id)
    experience_candidate: ExperienceCandidate[]

    @OneToMany(() => CertificateCandidate, (certificate_candidate) => certificate_candidate.candidate_id)
    certificate_candidate: CertificateCandidate[]

    @OneToMany(() => JobCandidates, (job_candidates) => job_candidates.candidate_id)
    job_candidates: JobCandidates[]
}
