import { Injectable, Logger } from "@nestjs/common";
import { CadastroAprovado } from "src/database/entity/CadastroAprovado";
import { StatusProposta } from "src/database/entity/enumeration/StatusProposta";
import { Proposta } from "src/database/entity/Proposta";
import { CadastroAprovadoRepositoryFacade } from "src/database/repository/CadastroAprovadoRepositoryFacade";
import { PropostaRepositoryFacade } from "src/database/repository/PropostaRepositoryFacade";

@Injectable()
export class AnaliseAutomatica {
    private readonly logger = new Logger(AnaliseAutomatica.name);

    constructor(private readonly cadastroAprovadoRepositoryFacade: CadastroAprovadoRepositoryFacade,
        private readonly propostaRepositoryFacade: PropostaRepositoryFacade
    ) {}

    public async executar(proposta: Proposta) {
        const proponente = proposta.proponente;

        this.logger.log(`Iniciando analise automatica da proposta: ${proposta.id} => proponente CPF: ${proponente.cpf}`);
        
        const cadastroAprovado = await this.cadastroAprovadoRepositoryFacade.findByCpf(proponente.cpf);
        this.logger.log(`Cadastro aprovado: ${JSON.stringify(cadastroAprovado)}`);
        
        if (cadastroAprovado) {
            if (this.propostaAprovada(proposta, cadastroAprovado)) {
                this.logger.log(`Proposta ${proposta.id} aprovada`)
                proposta.status = StatusProposta.APROVADA.name;
                proposta.dataAlteracao = new Date();
                this.propostaRepositoryFacade.save(proposta);
                return;
            }
        }
        this.logger.log(`Proposta ${proposta.id} em analise manual`)
        proposta.status = StatusProposta.ANALISE_MANUAL.name;
        proposta.dataAlteracao = new Date();
        this.propostaRepositoryFacade.save(proposta);
    }

    private propostaAprovada(proposta: Proposta, cadastroAprovado: CadastroAprovado): boolean {
        return cadastroAprovado.aprovado == 1 && proposta.valor <= cadastroAprovado.valorProposta;
    }

}