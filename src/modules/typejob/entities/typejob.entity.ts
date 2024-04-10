import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('typejob')
export class Typejob {
    @PrimaryGeneratedColumn()
    id: string;
}
