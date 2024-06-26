import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Cliente {

    @PrimaryGeneratedColumn()
    id: number;

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
