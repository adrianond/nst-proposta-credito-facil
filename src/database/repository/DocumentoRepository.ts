import { DataSource, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { Documento } from "../entity/Documento";


@Injectable()
export class DocumentoRepository extends Repository<Documento> {

    constructor(private dataSource: DataSource) {
        super(Documento, dataSource.createEntityManager());
    }

}