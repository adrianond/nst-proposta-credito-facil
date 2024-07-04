import { HttpStatus, Injectable, Logger } from "@nestjs/common";
import { EnderecoRepositoryFacade } from "src/database/repository/EnderecoRepositoryFacade";
import { ProponenteRepositoryFacade } from "src/database/repository/ProponenteRepositoryFacade";
import { PropostaRepositoryFacade } from "src/database/repository/PropostaRepositoryFacade";
import { TelefoneRepositoryFacade } from "src/database/repository/TelefoneRepositoryFacade";
import { DataBaseExcetion } from "src/exception/DataBaseExcetion";
import { PropostaNotFoundException } from "src/exception/PropostaNotFoundException";
import { ConnectionUtil } from "src/util/ConnectionUtil";
import { Connection } from "typeorm";


@Injectable()
export class ExcluiProposta {
    private readonly logger = new Logger(ExcluiProposta.name);

    constructor(private connection: Connection,
        private readonly propostaRepositoryFacade: PropostaRepositoryFacade,
        private readonly proponenteRepositoryFacade: ProponenteRepositoryFacade,
        private readonly enderecoRepositoryFacade: EnderecoRepositoryFacade,
        private readonly telefoneRepositoryFacade: TelefoneRepositoryFacade
    ) {}

    public async execute(id: number): Promise<void> {
        const proposta = await this.propostaRepositoryFacade.findById(id);
        
        if (null == proposta)
            throw new PropostaNotFoundException(`Proposta id ${id} não encontrada`, HttpStatus.NOT_FOUND);

        const proponente = proposta.proponente;
        let queryRunner = await ConnectionUtil.getConnection(this.connection);

       // try {
            this.logger.log('Excluindo proposta de crédito id {}:', id);
            await this.propostaRepositoryFacade.delete(proposta)
            //await this.enderecoRepositoryFacade.delete(proponente.enderecos)
            //await this.telefoneRepositoryFacade.delete(proponente.telefones)
            //await this.proponenteRepositoryFacade.delete(proponente);
            
           // await queryRunner.commitTransaction();
        /*
        } catch (err) {
            this.logger.error(`Erro ao excluir proposta id ${proposta.id} => Error: {}`, err);
            await queryRunner.rollbackTransaction();
            throw new DataBaseExcetion(`Erro ao excluir proposta id ${proposta.id}`, HttpStatus.INTERNAL_SERVER_ERROR)
        } finally {
            queryRunner.release()
        }

      */
    }
}
