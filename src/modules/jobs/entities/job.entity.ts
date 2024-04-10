import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('job')
export class Job {
    @PrimaryGeneratedColumn()
    id: string;
}
