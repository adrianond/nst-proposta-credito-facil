import { Module } from '@nestjs/common';
import { CriaProposta } from './usecase/CriaProposta';
import { PropostaCreditoFacilController } from './http/controller/PropostaCreditoFacilController';
import { PropostaRepositoryFacadeImpl } from './database/repository/PropostaRepositoryFacadeImpl';
import { PropostaRepositoryFacade } from './database/repository/PropostaRepositoryFacade';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Proposta } from './database/entity/Proposta';
import { Endereco } from './database/entity/Endereco';
import { Telefone } from './database/entity/Telefone';
import { Proponente } from './database/entity/Proponente';
import { ConsultaProposta } from './usecase/ConsultaProposta';
import { ExcluiProposta } from './usecase/ExcluiProposta';
import { ProponenteRepositoryFacadeImpl } from './database/repository/ProponenteRepositoryFacadeImpl';
import { ConsultaPropostas } from './usecase/ConsultaPropostas';
import { PropostaConverter } from './http/domain/converter/PropostaConverter';
import { ExcluiProponente } from './usecase/ExcluiProponente';
import { ProponenteController } from './http/controller/ProponenteController';
import { ProponenteRepositoryFacade } from './database/repository/ProponenteRepositoryFacade';
import { PropostaRepository } from './database/repository/PropostaRepository';
import { ProponenteRepository } from './database/repository/ProponenteRepository';
import { EnderecoRepository } from './database/repository/EnderecoRepository';
import { EnderecoRepositoryFacade } from './database/repository/EnderecoRepositoryFacade';
import { EnderecoRepositoryFacadeImpl } from './database/repository/EnderecoRepositoryFacadeImpl';
import { TelefoneRepository } from './database/repository/TelefoneRepository';
import { TelefoneRepositoryFacade } from './database/repository/TelefoneRepositoryFacade';
import { TelefoneRepositoryFacadeImpl } from './database/repository/TelefoneRepositoryFacadeImpl';
import { ConfigModule } from '@nestjs/config';
import { RedisService } from './config/Redis';
import { ClientsModule, Transport, ClientKafka } from '@nestjs/microservices';
import { PropostaCreditoFacilPublisher } from './publisher/PropostaCreditoFacilPublisher';
import { Partitioners } from 'kafkajs';
import { AnaliseAutomatica } from './usecase/AnaliseAutomatica';
import { CadastroAprovado } from './database/entity/CadastroAprovado';
import { CadastroAprovadoRepository } from './database/repository/CadastroAprovadoRepository';
import { CadastroAprovadoRepositoryFacade } from './database/repository/CadastroAprovadoRepositoryFacade';
import { CadastroAprovadoRepositoryFacadeImpl } from './database/repository/CadastroAprovadoRepositoryFacadeImpl';
import { UploadArquivoController } from './http/controller/UploadArquivoController';
import { SalvaDocumento } from './usecase/SalvaDocumento';
import { DocumentoRepository } from './database/repository/DocumentoRepository';
import { DocumentoRepositoryFacade } from './database/repository/DocumentoRepositoryFacade';
import { DocumentoRepositoryFacadeImpl } from './database/repository/DocumentoRepositoryFacadeImpl';
import { Documento } from './database/entity/Documento';
const { propostaCreditoFacilGroupId, kafkaClientId, kafkaEndPoint } = require('./util/ConfigEnv');


@Module({
  imports: [
    ConfigModule.forRoot(), //use environment variables
    TypeOrmModule.forRoot({
      type: 'oracle',
      host: 'localhost', //process.env.DB_HOST
      port: 1521, //process.env.DB_PORT
      username: 'SYSTEM', //process.env.DB_USER,
      password: 'admin', //process.env.DB_PASS
      sid: 'XE',
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: false,
      autoLoadEntities: true,
      useUTC: false,
      logging: true,
      maxQueryExecutionTime: 9999999,
      extra: {
        poolMax: 10, //parseInt(process.env.DB_POOL_MAX),
        poolMin: 5, //parseInt(process.env.DB_POOL_MIN),
        poolTimeout: 60, //parseInt(process.env.DB_POOL_TIMEOUT)
      },

    }),
    TypeOrmModule.forFeature([
      Proposta,
      Documento,
      Proponente,
      Endereco,
      Telefone,
      CadastroAprovado,
    ]),
    //kafka connection producer
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: kafkaClientId,
            brokers: [kafkaEndPoint],
          },
          consumer: {
            groupId: propostaCreditoFacilGroupId,
            allowAutoTopicCreation: true,
            sessionTimeout: 1 * 30 * 1000,
          },
          producer: {
            allowAutoTopicCreation: true,
            transactionTimeout: 1 * 30 * 1000,
            createPartitioner: Partitioners.LegacyPartitioner,
          },
        },
      },
    ]),
  ],
  controllers: [
    PropostaCreditoFacilController,
    ProponenteController,
    UploadArquivoController
  ],
  providers: [
    CriaProposta,
    ConsultaProposta,
    ExcluiProposta,
    ExcluiProponente,
    ConsultaPropostas,
    SalvaDocumento,
    AnaliseAutomatica,
    PropostaConverter,
    PropostaRepository,
    ProponenteRepository,
    EnderecoRepository,
    TelefoneRepository,
    CadastroAprovadoRepository,
    DocumentoRepository,
    RedisService,
    PropostaCreditoFacilPublisher,
    {
      provide: PropostaRepositoryFacade,
      useClass: PropostaRepositoryFacadeImpl,
    },
    {
      provide: ProponenteRepositoryFacade,
      useClass: ProponenteRepositoryFacadeImpl,
    },
    {
      provide: EnderecoRepositoryFacade,
      useClass: EnderecoRepositoryFacadeImpl,
    },
    {
      provide: TelefoneRepositoryFacade,
      useClass: TelefoneRepositoryFacadeImpl,
    },
    {
      provide: CadastroAprovadoRepositoryFacade,
      useClass: CadastroAprovadoRepositoryFacadeImpl,
    },
    {
      provide: DocumentoRepositoryFacade,
      useClass: DocumentoRepositoryFacadeImpl,
    },
    {
      //create kafka producer
      provide: 'PROPOSAL_PRODUCER',
      useFactory: async(kafkaService: ClientKafka) => {
        return kafkaService.connect();
      },
      inject: ['KAFKA_SERVICE']
    },
  ],
  exports: [PropostaRepositoryFacade, ProponenteRepositoryFacade],
})
export class AppModule {}
