import { HttpStatus, Logger } from "@nestjs/common";
import { DataBaseExcetion } from "src/exception/DataBaseExcetion";
import { Connection, QueryRunner } from "typeorm";

export class ConnectionUtil {


    public static async getConnection(connection: Connection): Promise<QueryRunner> {
        try {
            let queryRunner = connection.createQueryRunner();
            await queryRunner.connect();
            await queryRunner.startTransaction();

            return queryRunner;
        } catch (error) {
            let logger = new Logger(ConnectionUtil.name)
            logger.error('ConnectionUtil.startConnection - Error')
            throw new DataBaseExcetion('Erro ao criar conexão com BD', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}