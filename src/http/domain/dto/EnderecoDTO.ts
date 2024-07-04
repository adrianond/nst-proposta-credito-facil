import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { TipoEndereco } from "src/database/entity/enumeration/TipoEndereco";

export class EnderecoDTO {

    constructor() {
        this.id = undefined;
        this.logradouro = undefined;
        this.numero = undefined;
        this.complemento = undefined;
        this.bairro = undefined;
        this.cep = undefined;
        this.cidade = undefined;
        this.estado = undefined;
        this.tipo = undefined;
    }

    @ApiProperty()
    id: number = undefined;

    @ApiProperty()
    @IsNotEmpty({message:'Endereço não informado'})
    logradouro: string;

    @ApiProperty()
    @IsNotEmpty({message:'Número do endereço não informado'})
    numero: number;

    @ApiProperty()
    complemento: string;

    @ApiProperty()
    @IsNotEmpty({message:'Bairro não informado'})
    bairro: string;

    @ApiProperty()
    @IsNotEmpty({message:'CEP não informado'})
    cep: string;

    @ApiProperty()
    @IsNotEmpty({message:'Cidade não informada'})
    cidade: string;

    @ApiProperty()
    @IsNotEmpty({message:'Estado não informado'})
    estado: string;

    @ApiProperty()
    @IsNotEmpty({message:'Tipo do endereço não informado'})
    tipo: string;
}