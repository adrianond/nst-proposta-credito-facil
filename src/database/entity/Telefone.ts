import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Proponente } from "./Proponente";

@Entity('TELEFONE')
export class Telefone {

    @PrimaryGeneratedColumn()
    @PrimaryColumn({name:'ID'})
    id: number;

    @Column({name: 'DDD', nullable: false})
    ddd: string;

    @Column({name: 'NUMERO', nullable: false})
    numero:string

    @Column({name: 'TIPO', nullable: false})
    tipo:string;

    @ManyToOne(() => Proponente, (proponente) => proponente.enderecos)
    @JoinColumn({name:'PROPONENTE_ID',  referencedColumnName:'id'})
    proponente: Proponente

}