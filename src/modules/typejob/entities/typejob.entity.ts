import { TypesJobs } from "src/modules/jobs/entities/types_jobs.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('typejob')
export class Typejob {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({type: 'varchar', length: 255})
    name: string;

    @OneToMany(type => TypesJobs, types_jobs => types_jobs.typejob)
    types_jobs: TypesJobs[]
}
