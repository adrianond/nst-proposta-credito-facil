import { HttpStatus, Injectable, Logger } from "@nestjs/common";
import { Documento } from "src/database/entity/Documento";
import { StatusProposta } from "src/database/entity/enumeration/StatusProposta";
import { DocumentoRepositoryFacade } from "src/database/repository/DocumentoRepositoryFacade";
import { PropostaRepositoryFacade } from "src/database/repository/PropostaRepositoryFacade";
import { PropostaNotFoundException } from "src/exception/PropostaNotFoundException";

@Injectable()
export class SalvaDocumento {
    private readonly logger = new Logger(SalvaDocumento.name);

    constructor(private readonly propostaRepositoryFacade: PropostaRepositoryFacade,
        private readonly documentoRepositoryFacade: DocumentoRepositoryFacade) { }

    public async executar(idProposta: number, fileName: string): Promise<void> {
        console.log(idProposta)
        const proposta = await this.propostaRepositoryFacade.findById(idProposta);
        if (!proposta)
            throw new PropostaNotFoundException(`Proposta id ${idProposta} não encontrada`, HttpStatus.NOT_FOUND);

        console.log(`Proposta: ${JSON.stringify(proposta)}`)
        
        let documento = new Documento();
        documento.nomeArquivo = fileName;
        documento.tipo = 'CNH';
        documento.destino = '/app/arquivos/propostaCreditoFacil/documentos'
        documento.dataCriacao = new Date();
        documento.usuarioCriacao = 'USER';
        documento.proposta = proposta;

        this.logger.log(`Adicionando documento, ${JSON.stringify(documento)}`)
        const documentoSalvo = await this.documentoRepositoryFacade.save(documento);
        if (documentoSalvo) {
            this.logger.log('Documento adicionado com sucesso')
            proposta.status = StatusProposta.EM_ANALISE.name;
            proposta.dataAlteracao = new Date();
            proposta.usuarioAlteracao = 'USER';
            this.propostaRepositoryFacade.save(proposta);
        }
    }
}