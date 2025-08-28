import { FormBinderOptions } from "./FormsApi"

export interface FetchPostalCodeBinderFields {
  pincode?: string
  addressLine1?: string,
  addressLine2?: string,
  city?: string,
  state?: string,
  country?: string,
  complement?: string,
  number?: string,
}

export interface FetchPostalCodeBinderOptions extends FormBinderOptions {
  fieldNames?: FetchPostalCodeBinderFields
}