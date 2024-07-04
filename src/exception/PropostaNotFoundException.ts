import { HttpException, HttpStatus } from "@nestjs/common";

export class PropostaNotFoundException extends HttpException  {
    
    constructor(message: string, httpCode: HttpStatus) {
        super(message, httpCode);
      }

}