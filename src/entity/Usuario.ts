import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Usuario {

    @PrimaryGeneratedColumn()
    id: number;

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