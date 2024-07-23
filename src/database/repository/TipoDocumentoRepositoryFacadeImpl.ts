import { Injectable, Logger } from "@nestjs/common";
import { TipoDocumentoRepositoryFacade } from "./TipoDocumentoRepositoryFacade";
import { TipoDocumentoRepository } from "./TipoDocumentoRepository";
import { TipoDocumento } from "../entity/TipoDocumento";



@Injectable()
export class TipoDocumentoRepositoryFacadeImpl implements TipoDocumentoRepositoryFacade {
    private readonly logger = new Logger(TipoDocumentoRepositoryFacadeImpl.name);

    constructor(private repository: TipoDocumentoRepository) {}
    
    
    async findById(id: number): Promise<TipoDocumento> {
        return await this.repository.findOneById(id);
    }
}
