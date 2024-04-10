import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('address_company')
export class AddressCompany {
    @PrimaryGeneratedColumn()
    id: string;
}