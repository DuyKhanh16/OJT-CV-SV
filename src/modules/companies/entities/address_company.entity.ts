import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Company } from "./company.entity";
import { Localtion } from "src/modules/localtion/entities/localtion.entity";

@Entity('address_company')
export class AddressCompany {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({type: 'varchar', length: 255})
    address: string;

    @Column({type: 'varchar', length: 255})
    map_url: string;

    @Column({type:'date'})
    created_at: Date;

    @Column({type:'date'})
    updated_at: Date;

    @ManyToOne(type => Company, company => company.address_company)
    @JoinColumn({name: 'company_id'})
    company: Company

    @ManyToOne(type => Localtion, localtion => localtion.address_company)
    @JoinColumn({name: 'localtion_id'})
    localtion: Localtion
}