import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('company')
export class Company {
    @PrimaryGeneratedColumn()
    id: string;
}
