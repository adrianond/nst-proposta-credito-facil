import { ApiProperty } from "@nestjs/swagger";
import { ProponenteDTO } from "../dto/ProponenteDTO";
import { IsNotEmpty } from "class-validator";
import { TipoProposta } from "src/database/entity/enumeration/TipoProposta";

export class CriaPropostaRequest {

    constructor() {
        this.valor = undefined;
        this.tipo = undefined;
        this.proponenteDTO = undefined;
    }

    @ApiProperty()
    @IsNotEmpty({message:'Valor da proposta não informado'})
    valor: number;

    @ApiProperty()
    @IsNotEmpty({message:'Tipo da proposta não informado'})
    tipo: string;
    
    @ApiProperty()
    proponenteDTO: ProponenteDTO
}