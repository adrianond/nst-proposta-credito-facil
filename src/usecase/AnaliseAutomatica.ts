import { Injectable, Logger } from "@nestjs/common";
import { Proponente } from "src/database/entity/Proponente";

@Injectable()
export class AnaliseAutomatica {
    private readonly logger = new Logger(AnaliseAutomatica.name);

    public async executar(proponente: Proponente) {
        this.logger.log(`Iniciando analise automatica da proposta de credito do proponente de CPF: ${proponente.cpf}`)
    }

}