import { Inject, Injectable, Logger } from "@nestjs/common";
import { Proposta } from "../entity/Proposta";
import { QueryRunner } from "typeorm";
import { PropostaRepositoryFacade } from "./PropostaRepositoryFacade";
import { PropostaRepository } from "./PropostaRepository";
import { ProponenteRepository } from "./ProponenteRepository";
import { TelefoneRepository } from "./TelefoneRepository";
import { EnderecoRepository } from "./EnderecoRepository";
import { RedisService } from "src/config/Redis";



@Injectable()
export class PropostaRepositoryFacadeImpl implements PropostaRepositoryFacade {
    private readonly logger = new Logger(PropostaRepositoryFacadeImpl.name);

    constructor(private redisClient: RedisService,
        private propostaRepository: PropostaRepository,
        private proponenteRepository: ProponenteRepository,
        private telefoneRepository: TelefoneRepository,
        private enderecoRepository: EnderecoRepository
    ) { }


    async findById(id: number): Promise<Proposta> {
        return await this.propostaRepository.findOneById(id);
    }


    async save(proposta: Proposta): Promise<Proposta> {
        this.logger.log(JSON.stringify(proposta), 'Salvando nova proposta de crédito')

        this.deleteProposalsCached();
        return await this.propostaRepository.save(proposta);
    }


    async delete(proposta: Proposta): Promise<void> {
        this.deleteProposalsCached();
        const proponente = proposta.proponente;
        await this.telefoneRepository.remove(proponente.telefones);
        await this.enderecoRepository.remove(proponente.enderecos);
        await this.propostaRepository.remove(proposta)
        await this.proponenteRepository.remove(proponente)
    }

    async deleteById(id: number, queryRunner: QueryRunner): Promise<void> {
        this.propostaRepository.deleteById(id, queryRunner);
    }

    async findAll(): Promise<Proposta[]> {
        const propostasCached = await this.redisClient.get('proposals')
        if (propostasCached) {
            this.logger.log('Propostas cached')
            return JSON.parse(propostasCached)
        }
        const propostas = await this.propostaRepository.find({ order: { id: "ASC" } });
        this.logger.log('Propostas repository')
        await this.redisClient.set('proposals', JSON.stringify(propostas));

        return propostas;
    }

    private async deleteProposalsCached(): Promise<void> {
        const propostasCached = await this.redisClient.get('proposals')
        if (propostasCached)
            this.redisClient.del('proposals');
    }

}
