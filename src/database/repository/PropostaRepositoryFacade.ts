import { QueryRunner } from "typeorm";
import { Proposta } from "../entity/Proposta";

export abstract class PropostaRepositoryFacade {
    abstract save(proposta: Proposta): Promise<Proposta>
    abstract findById(id: number): Promise<Proposta>
    abstract delete(proposta: Proposta): Promise<void>
    abstract findAll(): Promise<Proposta[]>
    abstract deleteById(id: number, queryRunner: QueryRunner): Promise<void>
}