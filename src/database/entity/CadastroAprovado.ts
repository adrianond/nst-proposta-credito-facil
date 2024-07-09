import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('CADASTRO_APROVADO')
export class CadastroAprovado {

    @PrimaryColumn({name:'CPF', nullable: false})
    cpf: string;

    @Column({name:'VALOR_PROPOSTA', nullable: false})
    valorProposta: number;

    @Column({name:'APROVADO', nullable: false})
    aprovado: number;

}