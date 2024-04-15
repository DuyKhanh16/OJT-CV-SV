import { AddressCompany } from "src/modules/companies/entities/address_company.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('localtion')
export class Localtion {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({type: 'varchar', length: 255})
    nameCity: string;

    @OneToMany(type => AddressCompany, address_company => address_company.localtion)
    address_company: AddressCompany[]
}
