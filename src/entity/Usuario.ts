import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { GenericEntity } from "./GenericEntity";

@Entity()
export class Usuario extends GenericEntity {

    @Column({default: '', nullable: true})
    nome: string;

    @Column({default: '', nullable: true})
    username: string;

    @Column({default: '', nullable: true, length: 1024})
    password: string;

    @Column({default: '', nullable: true})
    dicaSenha: string;

    @Column({nullable: true, type: 'text'})
    avatar: string;

    @Column({default: '', nullable: true})
    idAvatar: string;

    @Column({nullable: true, type: 'text'})
    permissoes: string;
}