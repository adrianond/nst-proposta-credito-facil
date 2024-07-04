import { Injectable, Logger } from "@nestjs/common";
import { PropostaRepositoryFacade } from "src/database/repository/PropostaRepositoryFacade";
import { CriaPropostaResponse } from "src/http/domain/response/CriaPropostaResponse";
import { CriaPropostaRequest } from "src/http/domain/request/CriaPropostaRequest";
import { PropostaConverter } from "src/http/domain/converter/PropostaConverter";
import { PropostaCreditoFacilPublisher } from "src/publisher/PropostaCreditoFacilPublisher";


@Injectable()
export class CriaProposta {
    private readonly logger = new Logger(CriaProposta.name);

    constructor(private readonly propostaRepositoryFacade: PropostaRepositoryFacade,
        private readonly propostaConverter: PropostaConverter,
        private readonly propostaCreditoFacilPublisher: PropostaCreditoFacilPublisher
    ) { }

    public async execute(criaPropostaRequest: CriaPropostaRequest): Promise<CriaPropostaResponse> {
        this.logger.log(JSON.stringify(criaPropostaRequest), 'Criando nova proposta de crédito')
        let criaPropostaResponse = new CriaPropostaResponse();

        const propostaSalva = await this.propostaRepositoryFacade.save(this.propostaConverter.fromDtoToentity(criaPropostaRequest))
        console.log(propostaSalva)

        this.propostaCreditoFacilPublisher.publish(propostaSalva);
        
        criaPropostaResponse.id = propostaSalva.id;
        criaPropostaResponse.status = propostaSalva.status;
        return criaPropostaResponse;
    }

    
   
    
}
