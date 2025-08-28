import { FormBinderOptions } from "./FormsApi"

export interface TaxIdMaskBinderFields {
  type: string,
  taxId?: string
}

export interface TaxIdMaskBinderOptions extends FormBinderOptions {
  fieldNames: TaxIdMaskBinderFields
}