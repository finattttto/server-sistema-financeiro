import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { GenericEntity } from "./GenericEntity";

@Entity()
export class ContaPagar extends GenericEntity {

    @Column({default: '', nullable: true})
    fornecedorId: number;

    @Column({type: 'decimal', nullable: true})
    valor: number;

    @Column({type: 'date', nullable: true})
    dataVencimento: Date;

    @Column({default: '', nullable: true})
    observacoes: string;
}
