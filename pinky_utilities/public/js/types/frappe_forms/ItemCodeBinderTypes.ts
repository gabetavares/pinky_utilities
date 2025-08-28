import { FormBinderOptions } from "./FormsApi"

export interface ItemCodeBinderFields {
  itemCode?: string
}

export interface ItemCodeBinderOptions extends FormBinderOptions {
  fieldNames?: ItemCodeBinderFields
}