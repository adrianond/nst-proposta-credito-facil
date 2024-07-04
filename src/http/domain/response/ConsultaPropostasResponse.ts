import { PropostaDTO } from "../dto/PropostaDTO";

export class ConsultaPropostasResponse {

    constructor(propostasDTO: Array<PropostaDTO>) {
        this.propostasDTO = propostasDTO;
    }
    
    propostasDTO: Array<PropostaDTO>;
}