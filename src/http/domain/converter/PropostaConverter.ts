import { Injectable } from "@nestjs/common";
import { PropostaDTO } from "../dto/PropostaDTO";
import { Proposta } from "src/database/entity/Proposta";
import { ProponenteDTO } from "../dto/ProponenteDTO";
import { StatusProposta } from "src/database/entity/enumeration/StatusProposta";
import { CriaPropostaRequest } from "../request/CriaPropostaRequest";
import { Endereco } from "src/database/entity/Endereco";
import { Proponente } from "src/database/entity/Proponente";
import { EnderecoDTO } from "../dto/EnderecoDTO";
import { Telefone } from "src/database/entity/Telefone";
import { TelefoneDTO } from "../dto/TelefoneDTO";

@Injectable()
export class PropostaConverter {

    fromEntityToDto(proposta: Proposta): PropostaDTO {
        let propostaDTO = new PropostaDTO();

        propostaDTO.id = proposta.id;
        propostaDTO.status = proposta.status;
        propostaDTO.dataCriacao = proposta.dataCriacao;
        propostaDTO.dataAlteracao = proposta.dataAlteracao;
        propostaDTO.valor = proposta.valor;
        propostaDTO.usuarioAlteracao = proposta.usuarioAlteracao;
        propostaDTO.usuarioCriacao = proposta.usuarioCriacao;
        propostaDTO.tipo = proposta.tipo;

        if (null != proposta.proponente) {
            const proponente = proposta.proponente;
            let proponenteDTO = new ProponenteDTO();
            proponenteDTO.id = proponente.id;
            proponenteDTO.nome = proponente.nome;
            proponenteDTO.dataNascimento = proponente.dataNascimento;
            proponenteDTO.cpf = proponente.cpf;
            proponenteDTO.rg = proponente.rg;
            proponenteDTO.sexo = proponente.sexo;
            proponenteDTO.renda = proponente.renda;
            proponenteDTO.nomePai = proponente.nomePai;
            proponenteDTO.nomeMae = proponente.nomePai;

            if (proponente.enderecos.length) {
                let enderecosDTO = new Array<EnderecoDTO>
                proponente.enderecos.forEach(endereco => {
                    let enderecoDTO = new EnderecoDTO();
                    enderecoDTO.id = endereco.id;
                    enderecoDTO.bairro = endereco.bairro;
                    enderecoDTO.logradouro = endereco.logradouro;
                    enderecoDTO.numero = endereco.numero;
                    enderecoDTO.complemento = endereco.complemento;
                    enderecoDTO.cep = endereco.cep;
                    enderecoDTO.cidade = endereco.cidade;
                    enderecoDTO.estado = endereco.estado;
                    enderecoDTO.tipo = endereco.tipo;

                    enderecosDTO.push(enderecoDTO);
                })
                proponenteDTO.enderecosDTO = enderecosDTO;
            }
            if (proponente.telefones.length) {
                let telefonesDTO = new Array<TelefoneDTO>
                proponente.telefones.forEach(telefone => {
                    let telefoneDTO = new TelefoneDTO();
                    telefoneDTO.id = telefone.id;
                    telefoneDTO.ddd = telefone.ddd;
                    telefoneDTO.numero = telefone.numero;
                    telefoneDTO.tipo = telefone.tipo;

                    telefonesDTO.push(telefoneDTO);
                })
                proponenteDTO.telefonesDTO = telefonesDTO;
            }
            propostaDTO.proponenteDTO = proponenteDTO;
        }
            
        return propostaDTO;
    }

    fromDtoToentity(criaPropostaRequest: CriaPropostaRequest): Proposta {
        let proposta = new Proposta()
        proposta.dataCriacao = new Date()
        proposta.status = StatusProposta.EM_PREENCHIMENTO.name;
        proposta.tipo = criaPropostaRequest.tipo;
        proposta.valor = criaPropostaRequest.valor;
        proposta.usuarioCriacao = 'pegar usuario logado'
        proposta.proponente = this.buildProponente(criaPropostaRequest.proponenteDTO);

        return proposta;
    }

    private buildProponente(proponenteDTO: ProponenteDTO): Proponente {
        let enderecos = new Array<Endereco>;
        let telefones = new Array<Telefone>;
        let proponente = new Proponente();
        proponente.cpf = proponenteDTO.cpf;
        proponente.dataNascimento = proponenteDTO.dataNascimento;
        proponente.nome = proponenteDTO.nome;
        proponente.nomeMae = proponenteDTO.nomeMae;
        proponente.nomePai = proponenteDTO.nomePai;
        proponente.renda = proponenteDTO.renda;
        proponente.rg = proponenteDTO.rg;
        proponente.sexo = proponenteDTO.sexo;

        proponenteDTO.enderecosDTO.forEach(enderecoDTO => {
            let endereco = new Endereco()
            console.log('enderecoDTO', enderecoDTO)
            endereco.bairro = enderecoDTO.bairro;
            endereco.cep = enderecoDTO.cep;
            endereco.cidade = enderecoDTO.cidade;
            endereco.estado = enderecoDTO.cidade;
            endereco.logradouro = enderecoDTO.logradouro;
            endereco.estado = enderecoDTO.estado;
            endereco.numero = enderecoDTO.numero;
            endereco.complemento = enderecoDTO.complemento;
            endereco.tipo = enderecoDTO.tipo;
            enderecos.push(endereco)
        })
        proponente.enderecos = enderecos;


        proponenteDTO.telefonesDTO.forEach(telefonesDTO => {
            let telefone = new Telefone();
            telefone.ddd = telefonesDTO.ddd;
            telefone.numero = telefonesDTO.numero;
            telefone.tipo = telefonesDTO.tipo;
            telefones.push(telefone); 
        })
        proponente.telefones = telefones
        return proponente;
    }
}