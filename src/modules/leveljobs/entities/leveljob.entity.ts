import { LeversJobs } from "src/modules/jobs/entities/levers_jobs.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('leveljob')
export class Leveljob {
    @PrimaryGeneratedColumn()
    id: string;
    @Column({type: 'varchar', length: 255})
    name: string;
    
    lever_job: LeversJobs[]
    
}
