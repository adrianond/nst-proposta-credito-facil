import { CadastroAprovado } from "../entity/CadastroAprovado";


export abstract class CadastroAprovadoRepositoryFacade {
    abstract findByCpf(cpf: string): Promise<CadastroAprovado>
    abstract findAll(cpf: string, aprovado: number): Promise<CadastroAprovado[]>
}