import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('certificate_candidate')
export class CertificateCandidate {
    @PrimaryGeneratedColumn()
    id: string;
}
