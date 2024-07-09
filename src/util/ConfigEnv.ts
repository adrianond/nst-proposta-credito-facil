import * as dotenv from 'dotenv';

dotenv.config();
module.exports = {
  kafkaEndPoint: `localhost:9092`,
  propostaCreditoFacilGroupId: `credit-proposal-group`,
  topicoPropostaCreditoFacil: `credit-proposal-topic`,
  kafkaClientId: `credit_proposal`,
  kafkaRetryCount: 5,
  proxy_host:`${process.env.PROXY_HOST}`,
  proxy_port:`${process.env.PROXY_PORT}`,
};
