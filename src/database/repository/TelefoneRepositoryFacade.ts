import { QueryRunner } from "typeorm";
import { Telefone } from "../entity/Telefone";

export abstract class TelefoneRepositoryFacade {
    abstract deleteById(id: number, queryRunner: QueryRunner): Promise<void>
    abstract delete(telefones: Array<Telefone>): Promise<void>
}