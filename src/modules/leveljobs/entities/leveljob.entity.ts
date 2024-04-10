import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('leveljob')
export class Leveljob {
    @PrimaryGeneratedColumn()
    id: string;
}
