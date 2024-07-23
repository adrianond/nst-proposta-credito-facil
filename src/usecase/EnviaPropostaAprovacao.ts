import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { StatusProposta } from "src/database/entity/enumeration/StatusProposta";
import { PropostaRepositoryFacade } from "src/database/repository/PropostaRepositoryFacade";
import { PropostaNotFoundException } from "src/exception/PropostaNotFoundException";
import { PropostaCreditoFacilPublisher } from "src/publisher/PropostaCreditoFacilPublisher";

@Injectable()
export class EnviaPropostaAprovacao {
    private readonly logger = new Logger(EnviaPropostaAprovacao.name);

    constructor(private readonly propostaRepositoryFacade: PropostaRepositoryFacade,
        private readonly propostaCreditoFacilPublisher: PropostaCreditoFacilPublisher) { }

    public async execute(id: number): Promise<void> {
        const proposta = await this.propostaRepositoryFacade.findById(id);
        if (!proposta)
            throw new PropostaNotFoundException(`Proposta id ${id} não encontrada`, HttpStatus.NOT_FOUND);

        if (proposta.status != StatusProposta.EM_ANALISE.name)
            throw new HttpException(`Proposta id ${id} com status invalido: ${proposta.status}`, HttpStatus.INTERNAL_SERVER_ERROR);

        this.propostaCreditoFacilPublisher.publish(proposta);
    }
}
