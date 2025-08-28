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