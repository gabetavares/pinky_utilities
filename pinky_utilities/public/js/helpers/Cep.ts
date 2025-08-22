import { CepInterface } from "../types/Cep";

export default class Cep implements CepInterface {
  public readonly postcode: string;
  public readonly street: string;
  public readonly complement: string;
  public readonly unit: string;
  public readonly neighbourhood: string;
  public readonly city: string;
  public readonly state_code: string;
  public readonly state_name: string;
  public readonly region: string;
  public readonly area_code: string;

  constructor(cep: CepInterface) {
    this.postcode = cep.postcode;
    this.street = cep.street;
    this.complement = cep.complement;
    this.unit = cep.unit;
    this.neighbourhood = cep.neighbourhood;
    this.city = cep.city;
    this.state_code = cep.state_code;
    this.state_name = cep.state_name;
    this.region = cep.region;
    this.area_code = cep.area_code;
  }

  public static fromJSON(json: Partial<CepInterface>) {
    return new Cep({
      postcode: json.postcode || "",
      street: json.street || "",
      complement: json.complement || "",
      unit: json.unit || "",
      neighbourhood: json.neighbourhood || "",
      city: json.city || "",
      state_code: json.state_code || "",
      state_name: json.state_name || "",
      region: json.region || "",
      area_code: json.area_code || "",
    })
  }
}