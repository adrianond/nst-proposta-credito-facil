import { Inject, Injectable, Logger } from "@nestjs/common";
import { Producer } from "@nestjs/microservices/external/kafka.interface";
import { Proposta } from "src/database/entity/Proposta";

@Injectable()
export class PropostaCreditoFacilPublisher {
    private readonly logger = new Logger(PropostaCreditoFacilPublisher.name)

    constructor(@Inject('PROPOSAL_PRODUCER') private readonly kafkaProducer: Producer) { }

    public publish(proposta: Proposta) {
        const jsonProposal = JSON.stringify(proposta);

        this.kafkaProducer.send(
            {
                topic: 'credit-proposal-topic',
                messages: [{ key: `${proposta.id}`, value: jsonProposal }]
            }).catch((err) => {
                this.logger.error(err);
            })

        this.logger.log('Message sent: ', jsonProposal)
    }
}