import { Controller, HttpCode, Logger, Param, Post, Query, UploadedFile, UseInterceptors, } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBody, ApiConsumes, ApiOperation } from "@nestjs/swagger";
import { SalvaDocumento } from "src/usecase/SalvaDocumento";
const fs = require('fs')



@Controller('document')
export class UploadArquivoController {
    private readonly logger = new Logger(UploadArquivoController.name);

    constructor(private readonly salvaDocumento: SalvaDocumento) { }


    @Post('upload')
    @ApiConsumes('multipart/form-data')
    @ApiBody({ schema: { type: 'object', properties: { file: { type: 'string', format: 'binary', }, }, }, })
    @HttpCode(201)
    @ApiOperation({ summary: 'Upload file' })
    @UseInterceptors(FileInterceptor('file'))
    async upload(@UploadedFile() file, @Query('idProposta') idProposta: number,
                                       @Query('idDocumento') idDocumento: number,) {

        const img = fs.readFileSync('C:/documentos/cnh_verso.jpeg');
        const base64String = new Buffer(img).toString('base64');
        const base64StringWithPrefix = `data:image/png;base64, ${base64String}`;
        //this.logger.log(base64StringWithPrefix);

        await this.salvaDocumento.executar(idProposta, idDocumento, file.originalname);
    }
}