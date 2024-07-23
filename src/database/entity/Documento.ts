import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Proposta } from "./Proposta";

@Entity('DOCUMENTO')
export class Documento {

    @PrimaryGeneratedColumn()
    @PrimaryColumn({name:'ID'})
    id: number;

    @Column({name:'NOME_ARQUIVO', nullable: false })
    nomeArquivo: string

    @Column({name:'PATH_DESTINO', nullable: false })
    destino: string

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

    
    @ManyToOne(() => Proposta, proposta => proposta.id, { cascade: true, eager: true })
    @JoinColumn({name:'PROPOSTA_ID',  referencedColumnName:'id'})
    proposta: Proposta
    

}