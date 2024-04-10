import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('education_candidate')
export class EducationCandidate {
    @PrimaryGeneratedColumn()
    id: string;
}
