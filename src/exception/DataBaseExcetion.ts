import { HttpException, HttpStatus } from "@nestjs/common";

export class DataBaseExcetion extends HttpException  {
    
    constructor(message: string, httpCode: HttpStatus) {
        super(message, httpCode);
      }

}