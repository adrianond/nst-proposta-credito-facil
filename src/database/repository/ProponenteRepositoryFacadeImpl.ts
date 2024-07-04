import { Injectable, Logger } from "@nestjs/common";
import { QueryRunner } from "typeorm";
import { Proponente } from "../entity/Proponente";
import { ProponenteRepositoryFacade } from "./ProponenteRepositoryFacade";
import { ProponenteRepository } from "./ProponenteRepository";

@Injectable()
export class ProponenteRepositoryFacadeImpl implements ProponenteRepositoryFacade {
    private readonly logger = new Logger(ProponenteRepositoryFacadeImpl.name);

    constructor(private proponenteRepository: ProponenteRepository) {}

    async findById(id: number): Promise<Proponente> {
        return await this.proponenteRepository.findOneById(id);
    }

    async delete(proponente: Proponente): Promise<void> {
        this.logger.log('Excluindo proponente {}:', JSON.stringify(proponente));
        await this.proponenteRepository.remove(proponente)
    }

    async deleteById(id: number, queryRunner: QueryRunner): Promise<void> {
        this.proponenteRepository.deleteById(id, queryRunner);
    }

}
