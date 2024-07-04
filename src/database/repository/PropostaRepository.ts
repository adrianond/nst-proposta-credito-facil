import { DataSource, QueryRunner, Repository } from "typeorm";
import { Proposta } from "../entity/Proposta";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PropostaRepository extends Repository<Proposta> {

    constructor(private dataSource: DataSource) {
        super(Proposta, dataSource.createEntityManager());
    }

    async deleteById(id: number, queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`DELETE FROM PROPOSTA WHERE ID = (:1)`, [id])
    }
}