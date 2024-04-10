import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('typecompany')
export class Typecompany {
    @PrimaryGeneratedColumn()
    id: string;
}
