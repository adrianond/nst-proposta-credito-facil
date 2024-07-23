import { DataSource, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { TipoDocumento } from "../entity/TipoDocumento";



@Injectable()
export class TipoDocumentoRepository extends Repository<TipoDocumento> {

    constructor(private dataSource: DataSource) {
        super(TipoDocumento, dataSource.createEntityManager());
    }

}