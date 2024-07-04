export class TipoProposta {
    static EMPRESTIMO_CONSIGNADO = new TipoProposta('Empréstimo Consignado')
    static EMPRESTIMO_PESSOAL = new TipoProposta('Emprestimo Pessoal')

    constructor(name) {
        this.name = name
    }

    name: string;
}