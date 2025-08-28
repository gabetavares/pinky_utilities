export interface FormEventInterface {
  registerHandlers(): void;
}

export interface FrappeDialogOptions {
  title: string,
  indicator: string,
  message: string,
}

interface FormBinderOptions {
  formName: string;
}

export interface FetchCompanyBinderFields {
  type: string,
  taxId?: string;
  tradingName?: string;
  companyName?: string;
}

export interface FetchCompanyBinderOptions extends FormBinderOptions {
  fieldNames: FetchCompanyBinderFields
}

export interface UpdateTaxLabelBinderFields {
  type: string,
  taxId?: string;
}

export interface UpdateTaxLabelBinderOptions extends FormBinderOptions {
  fieldNames: UpdateTaxLabelBinderFields
}

export interface TaxIdMaskBinderFields {
  type: string,
  taxId?: string
}

export interface TaxIdMaskBinderOptions extends FormBinderOptions {
  fieldNames: TaxIdMaskBinderFields
}

export interface PhoneMaskBinderOptions extends FormBinderOptions {
  phoneFields: Array<string>
}

export interface PostalCodeMaskBinderFields {
  pincode?: string
}

export interface PostalCodeMaskBinderOptions extends FormBinderOptions {
  fieldNames?: PostalCodeMaskBinderFields
}

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

export interface ItemCodeBinderFields {
  itemCode?: string
}

export interface ItemCodeBinderOptions extends FormBinderOptions {
  fieldNames?: ItemCodeBinderFields
}