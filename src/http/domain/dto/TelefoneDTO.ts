import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class TelefoneDTO {

    constructor() {
        this.ddd = undefined;
        this.numero = undefined;
        this.tipo = undefined;
        this.tipo = undefined;
    }

    @ApiProperty()
    id: number = undefined;

    @ApiProperty()
    @IsNotEmpty({message:'DDD do telefone não informado'})
    ddd: string;

    @ApiProperty()
    @IsNotEmpty({message:'Número do telefone não informado'})
    numero: string;

    @ApiProperty()
    @IsNotEmpty({message:'Tipo do telefone não informado'})
    tipo: string;
}