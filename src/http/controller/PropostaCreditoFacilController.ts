import { Body, Controller, Delete, Get, HttpCode, Inject, Param, Post } from "@nestjs/common";
import { ApiBody, ApiConsumes, ApiOperation, ApiProduces } from "@nestjs/swagger";
import { CriaPropostaResponse } from "src/http/domain/response/CriaPropostaResponse";
import { ConsultaProposta } from "src/usecase/ConsultaProposta";
import { CriaProposta } from "src/usecase/CriaProposta";
import { ConsultaPropostaResponse } from "../domain/response/ConsultaPropostaResponse";
import { CriaPropostaRequest } from "../domain/request/CriaPropostaRequest";
import { ExcluiProposta } from "src/usecase/ExcluiProposta";
import { ConsultaPropostas } from "src/usecase/ConsultaPropostas";
import { ConsultaPropostasResponse } from "../domain/response/ConsultaPropostasResponse";


@Controller('proposals')
export class PropostaCreditoFacilController {

    constructor(private criaProposta: CriaProposta,
        private consultaProposta: ConsultaProposta,
        private excluiProposta: ExcluiProposta,
        private consultaPropostas: ConsultaPropostas
    ) { }


    @Post()
    @HttpCode(201)
    @ApiBody({ type: CriaPropostaRequest })
    @ApiOperation({ summary: 'Create a new proposal' })
    @ApiConsumes('application/json')
    @ApiProduces('application/json')
    async createProposal(@Body() criaPropostaRequest: CriaPropostaRequest): Promise<CriaPropostaResponse> {
        return await this.criaProposta.execute(criaPropostaRequest);
    }


    
    @Get()
    @HttpCode(200)
    @ApiOperation({ summary: 'Get proposals' })
    @ApiConsumes('application/json')
    @ApiProduces('application/json')
    async getProposals(): Promise<ConsultaPropostasResponse> {
        return await this.consultaPropostas.execute();
    }

    @Get('/proposal/:id')
    @HttpCode(200)
    @ApiOperation({ summary: 'Get proposal by id' })
    @ApiProduces('application/json')
    async findProposalById(@Param('id') id: number): Promise<ConsultaPropostaResponse> {
        return await (this.consultaProposta.execute(id));
    }

    @Delete('/proposal/:id')
    @HttpCode(204)
    @ApiOperation({ summary: 'Delete a proposal by id' })
    @ApiProduces('application/json')
    async deleteProposalById(@Param('id') id: number): Promise<void> {
        return await (this.excluiProposta.execute(id));
    }

}