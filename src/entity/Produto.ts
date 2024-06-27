import { Entity, Column } from "typeorm";
import { BaseEntity } from "./BaseEntity";

@Entity()
export class Produto extends BaseEntity {

    @Column({default: '', nullable: true})
    nome: string;

    @Column({type: 'decimal', nullable: true})
    preco: number;

    @Column({default: '', nullable: true})
    descricao: string;

    @Column({default: '', nullable: true})
    categoria: string;

    @Column({default: '', nullable: true})
    quantidadeEmEstoque: number;
}
