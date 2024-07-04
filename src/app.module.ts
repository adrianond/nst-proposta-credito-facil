import { CacheModule, Module } from '@nestjs/common';
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



@Module({
  imports: [
    ConfigModule.forRoot(), //use environment variables
    TypeOrmModule.forRoot({
      type: 'oracle',
      host: 'localhost', //process.env.DB_HOST
      port: 1521, //process.env.DB_PORT
      username: 'SYSTEM', //process.env.DB_USER,
      password : 'admin', //process.env.DB_PASS
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
      Proponente,
      Endereco,
      Telefone
    ]),
  ],
  controllers: [
    PropostaCreditoFacilController,
    ProponenteController
  ],
  providers: [
    CriaProposta,
    ConsultaProposta,
    ExcluiProposta,
    ExcluiProponente,
    ConsultaPropostas,
    PropostaConverter,
    PropostaRepository,
    ProponenteRepository,
    EnderecoRepository,
    TelefoneRepository,
    RedisService,
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
  ],
  exports: [PropostaRepositoryFacade, ProponenteRepositoryFacade],
})
export class AppModule {}
