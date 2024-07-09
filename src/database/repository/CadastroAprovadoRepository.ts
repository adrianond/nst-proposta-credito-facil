import { DataSource, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { CadastroAprovado } from "../entity/CadastroAprovado";

@Injectable()
export class CadastroAprovadoRepository extends Repository<CadastroAprovado> {

    constructor(private dataSource: DataSource) {
        super(CadastroAprovado, dataSource.createEntityManager());
    }

}