import { HttpStatus, Injectable, Logger } from "@nestjs/common";
import { Documento } from "src/database/entity/Documento";
import { StatusProposta } from "src/database/entity/enumeration/StatusProposta";
import { DocumentoRepositoryFacade } from "src/database/repository/DocumentoRepositoryFacade";
import { PropostaRepositoryFacade } from "src/database/repository/PropostaRepositoryFacade";
import { TipoDocumentoRepositoryFacade } from "src/database/repository/TipoDocumentoRepositoryFacade";
import { PropostaNotFoundException } from "src/exception/PropostaNotFoundException";
import { TipoDocumentoNotFoundException } from "src/exception/TipoDocumentoNotFoundException";


@Injectable()
export class SalvaDocumento {
    private readonly logger = new Logger(SalvaDocumento.name);

    constructor(private readonly propostaRepositoryFacade: PropostaRepositoryFacade,
        private readonly documentoRepositoryFacade: DocumentoRepositoryFacade,
        private readonly tipoDocumentoRepositoryFacade: TipoDocumentoRepositoryFacade) { }

    public async executar(idProposta: number, idDocumento: number, fileName: string): Promise<void> {
        const tipoDocumento = await this.tipoDocumentoRepositoryFacade.findById(idDocumento);
        if (!tipoDocumento)
            throw new TipoDocumentoNotFoundException(`Tipo de documento id ${idDocumento} não encontrado`, HttpStatus.NOT_FOUND);

        const proposta = await this.propostaRepositoryFacade.findById(idProposta);
        if (!proposta)
            throw new PropostaNotFoundException(`Proposta id ${idProposta} não encontrada`, HttpStatus.NOT_FOUND);

        let documento = new Documento();
        documento.nomeArquivo = fileName;
        documento.tipo = tipoDocumento.documento;
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