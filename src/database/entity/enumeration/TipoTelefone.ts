export class TipoTelefone {
    static CELULAR = new TipoTelefone('Comercial')
    static COMERCIAL = new TipoTelefone('Comercial')
    static RESIDENCIAL = new TipoTelefone('Residencial')

    constructor(name) {
        this.name = name
    }

    name: string;
}