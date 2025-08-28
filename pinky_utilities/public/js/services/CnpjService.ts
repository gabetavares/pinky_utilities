import FetchCompanyException from "../exception/FetchCompanyException";
import { Service } from "./Service";

export default class CnpjService extends Service {
  public readonly base_url: string = "https://open.cnpja.com"

  constructor() {
    super();
  }

  protected _url(tax_id: string): string {
    return `${this.base_url}/office/${tax_id}`;
  }

  public async fetch(tax_id: string): Promise<unknown> {
    try {
      const resp = await fetch(this._url(tax_id));

      if (!resp.ok)
        return this._failResponse(FetchCompanyException.couldNotFetch(tax_id));

      const data = await resp.json();
      return this._successResponse(data);
    } catch (err: unknown) {
      return this._failResponse(FetchCompanyException.unavailableService());
    }
  }
}