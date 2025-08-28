import FetchPostalCodeException from "../exception/FetchPostalCodeException";
import { FailServiceResponse, SuccessServiceResponse } from "./Service";

export type ViaCepResponse = {
  cep: string,
  logradouro: string,
  complemento: string,
  unidade: string,
  bairro: string,
  localidade: string,
  uf: string,
  estado: string,
  regiao: string,
  ibge: string,
  gia: string,
  ddd: string,
  siafi: string,
} | { erro: string }

export interface CepInterface {
  postcode: string,
  street: string,
  complement: string,
  unit: string,
  neighbourhood: string,
  city: string,
  state_code: string,
  state_name: string,
  region: string,
  area_code: string,
};

export type CepFailResponse = FailServiceResponse<FetchPostalCodeException>
export type CepSuccessResponse = SuccessServiceResponse<CepInterface>
export type CepResponse = CepFailResponse | CepSuccessResponse;