export class StatusProposta {

    static EM_PREENCHIMENTO = new StatusProposta('Em preenchimento')
    static ENVIADO_ANALISE = new StatusProposta('Enviado analise')
    static EM_ANALISE = new StatusProposta('Em analise')
    static PENDENCIA = new StatusProposta('pendencia')
    static RECUSADO = new StatusProposta('recusado')
    static APROVADO = new StatusProposta('aprovado')


    constructor(name) {
        this.name = name
    }

    name: string;
}