import { Injectable, Logger } from "@nestjs/common";
import { PropostaRepositoryFacade } from "src/database/repository/PropostaRepositoryFacade";
import { PropostaConverter } from "src/http/domain/converter/PropostaConverter";
import { PropostaDTO } from "src/http/domain/dto/PropostaDTO";
import { ConsultaPropostasResponse } from "src/http/domain/response/ConsultaPropostasResponse";

@Injectable()
export class ConsultaPropostas {
    private readonly logger = new Logger(ConsultaPropostas.name);

    constructor(private readonly propostaRepositoryFacade: PropostaRepositoryFacade,
        private readonly propostaConverter: PropostaConverter
    ) { }

    public async execute(): Promise<ConsultaPropostasResponse> {
        let propostasDTO = new Array<PropostaDTO>;

        const propostas = await this.propostaRepositoryFacade.findAll();
        this.logger.log('Consultando propostas:', JSON.stringify(propostas))

        if (propostas.length) {
            for (const proposta of propostas) {
                propostasDTO.push(this.propostaConverter.fromEntityToDto(proposta))
            }
        }
        return new ConsultaPropostasResponse(propostasDTO);
    }
}
