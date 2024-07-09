import { Inject, Injectable, Logger } from "@nestjs/common";
import { Producer } from "@nestjs/microservices/external/kafka.interface";
import { Proposta } from "src/database/entity/Proposta";
import { KafkaPayload } from "src/http/domain/kafka/KafkaPayload";
const { topicoPropostaCreditoFacil } = require('../util/ConfigEnv');

@Injectable()
export class PropostaCreditoFacilPublisher {
    private readonly logger = new Logger(PropostaCreditoFacilPublisher.name)

    
    constructor(@Inject('PROPOSAL_PRODUCER') private readonly kafkaProducer: Producer) {}

    public publish(proposta: Proposta) {
        const jsonProposal = JSON.stringify(proposta);

        let payload = new KafkaPayload<String>;
        payload.key = String(proposta.id);
        payload.value = JSON.stringify(proposta);

        this.kafkaProducer.send(
            {
                topic: topicoPropostaCreditoFacil,
                messages: [{ key: `${proposta.id}`, value: jsonProposal }]
            }).catch((err) => {
                this.logger.error(err);
            })

        this.logger.log('Message sent: ', jsonProposal)
    }
        
}