import { HttpStatus, Injectable, Logger } from "@nestjs/common";
import { PropostaRepositoryFacade } from "src/database/repository/PropostaRepositoryFacade";
import { PropostaRepositoryFacadeImpl } from "src/database/repository/PropostaRepositoryFacadeImpl";
import { PropostaNotFoundException } from "src/exception/PropostaNotFoundException";
import { PropostaConverter } from "src/http/domain/converter/PropostaConverter";
import { ConsultaPropostaResponse } from "src/http/domain/response/ConsultaPropostaResponse";

@Injectable()
export class ConsultaProposta {
    private readonly logger = new Logger(ConsultaProposta.name);

    constructor(private readonly propostaRepositoryFacade: PropostaRepositoryFacade,
        private readonly propostaConverter: PropostaConverter
    ) {}

    public async execute(id: number): Promise<ConsultaPropostaResponse> {
        this.logger.log('Consultando proposta de crédito de id {}:', id);
        
        const proposta = await this.propostaRepositoryFacade.findById(id);
        if (null == proposta)
            throw new PropostaNotFoundException(`Proposta id ${id} não encontrada`, HttpStatus.NOT_FOUND);

        console.log(proposta);
        return new ConsultaPropostaResponse(this.propostaConverter.fromEntityToDto(proposta));
    }
}
