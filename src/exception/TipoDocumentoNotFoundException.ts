import { HttpException, HttpStatus } from "@nestjs/common";

export class TipoDocumentoNotFoundException extends HttpException  {
    
    constructor(message: string, httpCode: HttpStatus) {
        super(message, httpCode);
      }

}