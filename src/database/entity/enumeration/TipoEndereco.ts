export class TipoEndereco {
    static RESIDENCIAL = new TipoEndereco('Residencial')
    static COMERCIAL = new TipoEndereco('Comercial')

    constructor(name) {
        this.name = name
    }

    name: string;
}