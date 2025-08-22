import type { CepFailResponse, CepInterface, CepResponse, CepSuccessResponse, ViaCepResponse } from "../types/Cep";
import { Service } from "./Service";

export default class CepService extends Service {
  public readonly base_url: string = "https://viacep.com.br/";

  constructor() {
    super();
  }

  protected _url(postcode: string): string {
    return `${this.base_url}/ws/${postcode}/json/`
  }

  protected _fail(code: string, message: string): CepFailResponse {
    return this._response({
      success: false,
      payload: { code, message }
    });
  }

  protected _success(data: CepInterface): CepSuccessResponse {
    return this._response({
      success: true,
      payload: data
    });
  }

  public async fetch(postcode: string): Promise<CepResponse> {
    try {
      const resp = await fetch(this._url(postcode));

      if (!resp.ok)
        return this._fail("", "Não foi possível encontrar o CEP digitado.");

      const data = await resp.json() as ViaCepResponse;

      if ("erro" in data)
        return this._fail("", "O CEP digitado é inválido.");

      return this._success({
        postcode: data.cep,
        street: data.logradouro,
        complement: data.complemento,
        unit: data.unidade,
        neighbourhood: data.bairro,
        city: data.localidade,
        state_code: data.uf,
        state_name: data.estado,
        region: data.regiao,
        area_code: data.ddd,
      });
    } catch (err: unknown) {
      return this._fail("", "Serviço de busca de CEP indisponível no momento.");
    }
  }
}