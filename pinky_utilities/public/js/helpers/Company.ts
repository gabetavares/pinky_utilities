import { CompanyInterface } from "../types/Company";

export default class Company {
  public readonly tax_id: string;
  public readonly alias: string;
  public readonly name: string;
  public readonly updated_at: string;

  constructor(company: CompanyInterface) {
    this.tax_id = company.tax_id;
    this.alias = company.alias;
    this.name = company.name;
    this.updated_at = company.updated_at;
  }

  public static fromJSON(json: Partial<CompanyInterface>) {
    return new Company({
      tax_id: json.tax_id || "",
      alias: json.alias || "",
      name: json.name || "",
      updated_at: json.updated_at || "",
    })
  }
}