import { Entity, Column } from "typeorm";
import { GenericEntity } from "./GenericEntity";

@Entity()
export class Venda extends GenericEntity {

    @Column({default: '', nullable: true})
    clienteId: number;

    @Column({type: 'decimal', nullable: true})
    valor: number;

    @Column({type: 'date', nullable: true})
    dataVenda: Date;

    @Column({default: '', nullable: true})
    observacoes: string;
}
