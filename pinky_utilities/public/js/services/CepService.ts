import FetchPostalCodeException from "../exception/FetchPostalCodeException";
import { CepInterface, CepResponse, type ViaCepResponse } from "../types/Cep";
import { Service } from "./Service";

export default class CepService extends Service {
  public readonly base_url: string = "https://viacep.com.br/";

  constructor() {
    super();
  }

  protected _url(postcode: string): string {
    return `${this.base_url}/ws/${postcode}/json/`
  }

  public async fetch(postcode: string): Promise<CepResponse> {
    try {
      const resp = await fetch(this._url(postcode));

      if (!resp.ok)
        return this._failResponse(FetchPostalCodeException.couldNotFetch(postcode));

      const data = await resp.json() as ViaCepResponse;

      if ("erro" in data)
        return this._failResponse(FetchPostalCodeException.invalidPostcode(postcode));

      return this._successResponse<CepInterface>({
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
      return this._failResponse(FetchPostalCodeException.unavailableService());
    }
  }
}