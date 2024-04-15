import { Company } from "src/modules/companies/entities/company.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('typecompany')
export class Typecompany {
    @PrimaryGeneratedColumn("increment")
    id: string;

    @Column({
        type: "varchar",
        length: 255
    })
    name: string;

    @OneToMany(type => Company, company => company.typeCompany_id)
    company: Company 
}
