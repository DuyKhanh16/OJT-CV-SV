import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("types_jobs")
export class TypesJobs {
    @PrimaryGeneratedColumn()
    id: string;
}