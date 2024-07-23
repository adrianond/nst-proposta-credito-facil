import { TipoDocumento } from "../entity/TipoDocumento";


export abstract class TipoDocumentoRepositoryFacade {
    abstract findById(id: number): Promise<TipoDocumento>
}