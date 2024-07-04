import { Injectable } from "@nestjs/common";
import { QueryRunner } from "typeorm";
import { EnderecoRepositoryFacade } from "./EnderecoRepositoryFacade";
import { EnderecoRepository } from "./EnderecoRepository";
import { Endereco } from "../entity/Endereco";

@Injectable()
export class EnderecoRepositoryFacadeImpl implements EnderecoRepositoryFacade {

    constructor(private enderecoRepository: EnderecoRepository) {}
    
    
    async delete(enderecos: Endereco[]): Promise<void> {
        this.enderecoRepository.remove(enderecos);
    }


    async deleteById(id: number, queryRunner: QueryRunner): Promise<void> {
        this.enderecoRepository.deleteById(id, queryRunner);
    }



}
