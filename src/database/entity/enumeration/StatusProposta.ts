export class StatusProposta {

    static EM_PREENCHIMENTO = new StatusProposta('Em preenchimento')
    static EM_ANALISE = new StatusProposta('Em analise')
    static PENDENCIA = new StatusProposta('Pendencia')
    static RECUSADA = new StatusProposta('Recusada')
    static APROVADA = new StatusProposta('Aprovada')
    static ANALISE_MANUAL = new StatusProposta('Analise manual')


    constructor(name) {
        this.name = name
    }

    name: string;
}