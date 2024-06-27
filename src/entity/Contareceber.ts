import { Entity, Column } from "typeorm";
import { BaseEntity } from "./BaseEntity";

@Entity()
export class ContaReceber extends BaseEntity {

    @Column({default: '', nullable: true})
    clienteId: number;

    @Column({type: 'decimal', nullable: true})
    valor: number;

    @Column({type: 'date', nullable: true})
    dataVencimento: Date;

    @Column({default: '', nullable: true})
    observacoes: string;
}
