import { QueryRunner } from "typeorm";
import { Endereco } from "../entity/Endereco";

export abstract class EnderecoRepositoryFacade {
    abstract deleteById(id: number, queryRunner: QueryRunner): Promise<void>
    abstract delete(enderecos: Array<Endereco>): Promise<void>
}