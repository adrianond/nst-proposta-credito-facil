import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Proponente } from "./Proponente";



@Entity('PROPOSTA')
export class Proposta {

    @PrimaryGeneratedColumn()
    @PrimaryColumn({name:'ID'})
    id: number;

    @Column({name:'VALOR', nullable: false})
    valor: number;

    @Column({ name:'TIPO', nullable: false })
    tipo: string

    @Column({ name:'USUARIO_CRIACAO', nullable: false })
    usuarioCriacao: string

    @Column({ name:'USUARIO_ALTERACAO', nullable: true })
    usuarioAlteracao: string

    @Column({ name:'DATA_CRIACAO', nullable: false })
    dataCriacao: Date

    @Column({name:'DATA_ALTERACAO', nullable: true })
    dataAlteracao: Date

    @Column({name:'STATUS', nullable: false })
    status: string

    @OneToOne(() => Proponente, proponente => proponente.proposta, { cascade: true, eager: true })
    @JoinColumn({name:'PROPONENTE_ID',  referencedColumnName:'id'})
    proponente: Proponente

}