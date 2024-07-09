import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { BadRequestException, LogLevel, ValidationError, ValidationPipe } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
const { propostaCreditoFacilGroupId, kafkaClientId, kafkaEndPoint, kafkaRetryCount } = require('./util/ConfigEnv');


async function bootstrap() {
  process.env.TZ = 'America/Fortaleza';

  let logLevelsArray: LogLevel[] = ['error'];
  const logLevel = process.env.LOG_LEVEL || ['error'];

  if (typeof logLevel != 'boolean') {
    logLevelsArray = <LogLevel[]>logLevel.toString().split(',') || ['error'];
    if (logLevelsArray.find((e) => e === 'error') === undefined) {
      logLevelsArray.push('error');
    }
  }

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    exceptionFactory: (validationErrors: ValidationError[] = []) => {
      return new BadRequestException(
        validationErrors.map((error) => ({
          field: error.property,
          error: Object.values(error.constraints).join(', '),
        })),
      );
    },
  }));

  
  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
        client: {
            clientId: kafkaClientId,
            brokers: [kafkaEndPoint],
            retry: {
                retries: kafkaRetryCount,
            },
        },
        consumer: {
            groupId: propostaCreditoFacilGroupId,
        },
    },
});
  
  app.startAllMicroservices();

  const swaggerConfig = new DocumentBuilder()
    .setTitle('NST-PROPOSTA-CREDITO-FACIL')
    .addTag('Proposta Crédito Facil API')
    .setVersion('.0.01')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
