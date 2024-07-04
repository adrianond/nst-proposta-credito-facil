import { HttpStatus, Injectable, Logger } from "@nestjs/common";
import { ProponenteRepositoryFacade } from "src/database/repository/ProponenteRepositoryFacade";
import { ProponenteNotFoundException } from "src/exception/ProponenteNotFoundException";



@Injectable()
export class ExcluiProponente {
    private readonly logger = new Logger(ExcluiProponente.name);

    constructor(private readonly proponenteRepositoryFacade: ProponenteRepositoryFacade
    ) { }

    public async execute(id: number): Promise<void> {
        const proponente = await this.proponenteRepositoryFacade.findById(id)
        this.logger.log(JSON.stringify(proponente))

        if (null == proponente)
            throw new ProponenteNotFoundException(`Proponente id ${id} não encontrado`, HttpStatus.NOT_FOUND);

        await this.proponenteRepositoryFacade.delete(proponente)

    }
}
