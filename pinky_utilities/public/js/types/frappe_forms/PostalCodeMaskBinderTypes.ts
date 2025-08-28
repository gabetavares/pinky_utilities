import { FormBinderOptions } from "./FormsApi"

export interface PostalCodeMaskBinderFields {
  pincode?: string
}

export interface PostalCodeMaskBinderOptions extends FormBinderOptions {
  fieldNames?: PostalCodeMaskBinderFields
}