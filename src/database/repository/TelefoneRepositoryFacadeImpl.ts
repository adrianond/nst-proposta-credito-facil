import { Injectable } from "@nestjs/common";
import { QueryRunner } from "typeorm";
import { TelefoneRepositoryFacade } from "./TelefoneRepositoryFacade";
import { TelefoneRepository } from "./TelefoneRepository";
import { Telefone } from "../entity/Telefone";

@Injectable()
export class TelefoneRepositoryFacadeImpl implements TelefoneRepositoryFacade {

    constructor(private telefoneRepository: TelefoneRepository) {}
    
    
    async delete(telefones: Telefone[]): Promise<void> {
        this.telefoneRepository.remove(telefones)
    }


    async deleteById(id: number, queryRunner: QueryRunner): Promise<void> {
        this.telefoneRepository.deleteById(id, queryRunner);
    }

}
