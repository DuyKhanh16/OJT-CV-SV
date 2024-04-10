import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('account')
export class Account {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({type: 'varchar', length: 255})
    email: string;

    @Column({type: 'varchar', length: 255})
    password: string;
}
