import { Controller, Delete, HttpCode, Param } from "@nestjs/common";
import { ApiOperation, ApiProduces } from "@nestjs/swagger";
import { ExcluiProponente } from "src/usecase/ExcluiProponente";

@Controller('proponents')
export class ProponenteController {

    constructor(private excluiProponente: ExcluiProponente) { }


    @Delete('/proponent/:id')
    @HttpCode(204)
    @ApiOperation({ summary: 'Delete a proponent by id' })
    @ApiProduces('application/json')
    async deleteProposalById(@Param('id') id: number): Promise<void> {
        return await (this.excluiProponente.execute(id));
    }

}