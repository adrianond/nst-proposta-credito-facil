import { PropostaDTO } from "../dto/PropostaDTO";

export class ConsultaPropostaResponse {

    constructor(propostaDTO: PropostaDTO) {
        this.propostaDTO = propostaDTO;
    }
    
    propostaDTO: PropostaDTO;
}