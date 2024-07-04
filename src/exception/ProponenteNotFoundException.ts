import { HttpException, HttpStatus } from "@nestjs/common";

export class ProponenteNotFoundException extends HttpException  {
    
    constructor(message: string, httpCode: HttpStatus) {
        super(message, httpCode);
      }

}