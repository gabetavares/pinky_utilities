import { FormBinderOptions } from "./FormsApi";

export interface FetchCompanyBinderFields {
  type: string,
  taxId?: string;
  tradingName?: string;
  companyName?: string;
}

export interface FetchCompanyBinderOptions extends FormBinderOptions {
  fieldNames: FetchCompanyBinderFields
}