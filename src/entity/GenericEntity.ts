import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export class GenericEntity {

  @PrimaryGeneratedColumn('increment')
  id?: number;

  @CreateDateColumn()
  dataCriacao?: Date;

}
