import { Injectable, Logger } from "@nestjs/common";
import { Documento } from "../entity/Documento";
import { DocumentoRepositoryFacade } from "./DocumentoRepositoryFacade";
import { DocumentoRepository } from "./DocumentoRepository";



@Injectable()
export class DocumentoRepositoryFacadeImpl implements DocumentoRepositoryFacade {
    private readonly logger = new Logger(DocumentoRepositoryFacadeImpl.name);

    constructor(private repository: DocumentoRepository) {}


    async save(documento: Documento): Promise<Documento> {
        return await this.repository.save(documento);
    }
}
