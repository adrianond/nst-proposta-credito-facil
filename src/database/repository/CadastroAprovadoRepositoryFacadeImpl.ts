import { Injectable } from "@nestjs/common";
import { CadastroAprovadoRepositoryFacade } from "./CadastroAprovadoRepositoryFacade";
import { CadastroAprovado } from "../entity/CadastroAprovado";
import { CadastroAprovadoRepository } from "./CadastroAprovadoRepository";


@Injectable()
export class CadastroAprovadoRepositoryFacadeImpl implements CadastroAprovadoRepositoryFacade {

    constructor(private repository: CadastroAprovadoRepository) {}


    public async findByCpf(cpf: string): Promise<CadastroAprovado> {
        return await this.repository.findOne(
            { where: { cpf: cpf } }
        );
    }


    public async findAll(cpf: string, aprovado: number): Promise<CadastroAprovado[]> {
        return await this.repository
            .createQueryBuilder("cadastroAprovado")
            .where("cadastroAprovado.cpf = :cpf", { cpf: cpf })
            .orWhere("cadastroAprovado.aprovado = :aprovado", { aprovado: aprovado })
            .getMany();
    }
}
