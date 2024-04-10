import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('project_candidate')
export class ProjectCandidate {
    @PrimaryGeneratedColumn()
    id: string;
}
