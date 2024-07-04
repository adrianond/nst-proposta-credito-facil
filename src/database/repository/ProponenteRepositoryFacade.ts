import { QueryRunner } from "typeorm";
import { Proponente } from "../entity/Proponente";

export abstract class ProponenteRepositoryFacade {
    abstract delete(proponente: Proponente): Promise<void>
    abstract deleteById(id: number, queryRunner: QueryRunner): Promise<void>
    abstract findById(id: number): Promise<Proponente>
}