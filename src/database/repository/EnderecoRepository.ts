import { DataSource, QueryRunner, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { Endereco } from "../entity/Endereco";

@Injectable()
export class EnderecoRepository extends Repository<Endereco> {

    constructor(private dataSource: DataSource) {
        super(Endereco, dataSource.createEntityManager());
    }

    async deleteById(id: number, queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`DELETE FROM ENDERECO WHERE ID = (:1)`, [id])
    }
}