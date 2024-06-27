import { Entity, Column } from "typeorm";
import { GenericEntity } from "./GenericEntity";

@Entity()
export class Cliente extends GenericEntity {

    @Column({default: '', nullable: true})
    nome: string;

    @Column({default: '', nullable: true})
    endereco: string;

    @Column({default: '', nullable: true})
    telefone: string;

    @Column({default: '', nullable: true})
    email: string;

    @Column({default: '', nullable: true})
    cpfCnpj: string;

    @Column({default: '', nullable: true})
    observacoes: string;
}
