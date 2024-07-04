import { DataSource, QueryRunner, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { Proponente } from "../entity/Proponente";

@Injectable()
export class ProponenteRepository extends Repository<Proponente> {

    constructor(private dataSource: DataSource) {
        super(Proponente, dataSource.createEntityManager());
    }

    async deleteById(id: number, queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`DELETE FROM PROPONENTE WHERE ID = (:1)`, [id])
    }
}