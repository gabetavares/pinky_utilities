import { FormBinderOptions } from "./FormsApi";

export interface UpdateTaxLabelBinderFields {
  type: string,
  taxId?: string;
}

export interface UpdateTaxLabelBinderOptions extends FormBinderOptions {
  fieldNames: UpdateTaxLabelBinderFields
}