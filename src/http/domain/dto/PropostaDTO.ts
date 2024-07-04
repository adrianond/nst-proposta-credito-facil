import { ProponenteDTO } from "./ProponenteDTO";

export class PropostaDTO {

    constructor() {
        this.id = undefined;
        this.status = undefined;
        this.valor = undefined;
        this.dataCriacao = undefined;
        this.dataAlteracao = undefined; 
        this.usuarioCriacao = undefined; 
        this.usuarioAlteracao = undefined;
        this.proponenteDTO = undefined;
        this.tipo = undefined;

    }

    id: number;
    status: string;
    valor: number;
    dataCriacao: Date
    dataAlteracao: Date
    usuarioCriacao: string
    usuarioAlteracao: string
    proponenteDTO: ProponenteDTO
    tipo: string
}