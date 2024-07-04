import { Injectable, Logger } from "@nestjs/common";
import Redis from "ioredis";

@Injectable()
export class RedisService extends Redis {
    private readonly logger = new Logger(RedisService.name);

    constructor() {
        super(6379, 'localhost');

        super.on('error', (error) => {
            this.logger.error(error);
            process.exit(1);
        })

        super.on('connect', () => {
            this.logger.log('Connected to Redis');
        })
    }
}