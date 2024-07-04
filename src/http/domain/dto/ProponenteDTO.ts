import { ApiProperty } from "@nestjs/swagger";
import { EnderecoDTO } from "./EnderecoDTO";
import { TelefoneDTO } from "./TelefoneDTO";
import { IsNotEmpty } from "class-validator";

export class ProponenteDTO {

    constructor() {
        this.id = undefined;
        this.nome = undefined;
        this.dataNascimento = undefined;
        this.dataNascimento = undefined;
        this.cpf = undefined;
        this.rg = undefined;
        this.sexo = undefined;
        this.renda = undefined;
        this.nomePai = undefined;
        this.nomeMae = undefined;
        this.enderecosDTO = undefined;
        this.telefonesDTO = undefined; 
    }

    @ApiProperty()
    id: number;

    @ApiProperty()
    @IsNotEmpty({message:'Nome do proponente não informado'})
    nome: string;

    @ApiProperty()
    @IsNotEmpty({message:'Data de nascimento não informada'})
    dataNascimento: Date;

    @IsNotEmpty({message:'CPF não informado'})
    @ApiProperty()
    cpf: string;

    @IsNotEmpty({message:'RG não informado'})
    @ApiProperty()
    rg: string;

    @ApiProperty()
    @IsNotEmpty({message:'Sexo não informado'})
    sexo: string;

    @ApiProperty()
    @IsNotEmpty({message:'Renda não informada'})
    renda: number;

    @ApiProperty()
    @IsNotEmpty({message:'Nome do pai não informado'})
    nomePai: string;

    @ApiProperty()
    @IsNotEmpty({message:'Nome da mãe não informado'})
    nomeMae: string;

    @ApiProperty({
        isArray: true,
        type: EnderecoDTO
    })
    enderecosDTO: Array<EnderecoDTO>;

    @ApiProperty({
        isArray: true,
        type: TelefoneDTO
    })
    telefonesDTO: Array<TelefoneDTO>
}