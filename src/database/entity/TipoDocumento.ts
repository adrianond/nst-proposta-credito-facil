import { Column, Entity, PrimaryColumn } from "typeorm";


@Entity('TIPO_DOCUMENTO')
export class TipoDocumento {

    @PrimaryColumn({ name: 'ID' })
    id: number;

    @Column({ name: 'DOCUMENTO', nullable: false })
    documento: string

    @Column({ name: 'USUARIO_CRIACAO', nullable: false })
    usuarioCriacao: string

    @Column({ name: 'DATA_CRIACAO', nullable: false })
    dataCriacao: Date
}