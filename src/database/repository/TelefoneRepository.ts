import { DataSource, QueryRunner, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { Telefone } from "../entity/Telefone";

@Injectable()
export class TelefoneRepository extends Repository<Telefone> {

    constructor(private dataSource: DataSource) {
        super(Telefone, dataSource.createEntityManager());
    }

    async deleteById(id: number, queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`DELETE FROM ENDERECO WHERE ID = (:1)`, [id])
    }
}