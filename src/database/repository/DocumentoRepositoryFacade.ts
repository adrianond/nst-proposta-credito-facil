import { Documento } from "../entity/Documento";


export abstract class DocumentoRepositoryFacade {
    abstract save(documento: Documento): Promise<Documento>
}