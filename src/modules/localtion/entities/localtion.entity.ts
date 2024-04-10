import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('localtion')
export class Localtion {
    @PrimaryGeneratedColumn()
    id: string;
}
