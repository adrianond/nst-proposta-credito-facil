import { Column, Entity, JoinTable, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Proposta } from "./Proposta";
import { Endereco } from "./Endereco";
import { Telefone } from "./Telefone";

@Entity('PROPONENTE')
export class Proponente {

    @PrimaryGeneratedColumn()
    @PrimaryColumn({name:'ID'})
    id: number;

    @Column({name:'NOME', nullable: false})
    nome: string;

    @Column({name:'DATA_NASCIMENTO', nullable: false})
    dataNascimento: Date;

    @Column({name:'CPF', nullable: false})
    cpf: string;

    @Column({name:'RG', nullable: false})
    rg: string;

    @Column({name:'SEXO', nullable: false})
    sexo: string;

    @Column({name:'RENDA', nullable: false})
    renda: number;

    @Column({name:'NOME_PAI', nullable: false})
    nomePai: string;

    @Column({name:'NOME_MAE', nullable: false})
    nomeMae: string;

    @OneToMany(() => Endereco, (endereco) => endereco.proponente, {cascade: true, eager: true })
    enderecos: Array<Endereco>
  
    @OneToMany(() => Telefone, (telefone) => telefone.proponente, {cascade: true, eager: true })
    telefones: Array<Telefone>


    @OneToOne(() =>  Proposta, proposta => proposta.proponente)
    proposta: Proposta;

}