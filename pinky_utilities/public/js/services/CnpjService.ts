import { Service } from "./Service";

export default class CnpjService extends Service {
  public readonly base_url: string = "https://open.cnpja.com"

  protected _url(tax_id: string): string {
    return `${this.base_url}/office/${tax_id}`;
  }

  protected _fail(code: string, message: string) {
    return this._response({
      success: false,
      payload: { code, message }
    });
  }

  protected _success(data: Record<string, unknown>) {
    return this._response({
      success: true,
      payload: data
    });
  }

  public async fetch(tax_id: string): Promise<unknown> {
    try {
      const resp = await fetch(this._url(tax_id));

      if (!resp.ok)
        return this._fail("", "Not OK");

      const data = await resp.json();

      return this._success(data);
    } catch (err: unknown) {
      return this._fail("", "Error message");
    }
  }
}