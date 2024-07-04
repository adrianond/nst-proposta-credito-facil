import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Proponente } from "./Proponente";


@Entity('ENDERECO')
export class Endereco {

    @PrimaryGeneratedColumn()
    @PrimaryColumn({name:'ID'})
    id: number;

    @Column({name:'LOGRADOURO',  nullable: false})
    logradouro: string;

    @Column({name:'NUMERO', nullable: false})
    numero: number;

    @Column({name:'COMPLEMENTO', nullable: true})
    complemento: string;

    @Column({name:'BAIRRO', nullable: false})
    bairro: string;
    
    @Column({name:'CEP', nullable: false})
    cep: string;

    @Column({name:'CIDADE', nullable: false})
    cidade: string;

    @Column({name:'ESTADO', nullable: false})
    estado: string;

    @Column({name:'TIPO', nullable: false})
    tipo: string;

    @ManyToOne(() => Proponente, (proponente) => proponente.enderecos)
    @JoinColumn({name:'PROPONENTE_ID',  referencedColumnName:'id'})
    proponente: Proponente
}