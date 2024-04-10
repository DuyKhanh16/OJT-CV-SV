import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("levers_jobs")
export class LeversJobs {
    @PrimaryGeneratedColumn()
    id: string;
}