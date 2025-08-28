import FetchCompanyException from "../exception/FetchCompanyException";
import Company from "../helpers/Company";
import CnpjService from "../services/CnpjService";
import { Frappe, FrappeForm } from "../types/Frappe";
import { FetchCompanyBinderFields, FetchCompanyBinderOptions } from "../types/frappe_forms/FetchCompanyBinderTypes";
import { FormEventInterface } from "../types/frappe_forms/FormsApi";
import FrappeFormEvent from "./FrappeFormEvent";

export default class FetchCompanyBinder extends FrappeFormEvent implements FormEventInterface {
  protected _company: Company | null = null;
  public readonly fieldNames: Required<FetchCompanyBinderFields>;

  constructor(frappe: Frappe, options: FetchCompanyBinderOptions) {
    super(frappe, options.formName);

    const {
      taxId = "tax_id",
      tradingName = "custom_nome_fantasia",
      companyName = "custom_nome_de_registro",
      ...fieldNames
    } = options.fieldNames;

    this.fieldNames = { taxId, tradingName, companyName, ...fieldNames };
  }

  public registerHandlers(): void {
    this._addHandler(this.fieldNames.type, (frm: FrappeForm) => {
      const type = frm.doc[this.fieldNames.type] || "";
      if (type != "Company" || this._company == null) {
        frm.set_value(this.fieldNames.tradingName, "");
        frm.set_value(this.fieldNames.companyName, "");
        return;
      }

      frm.set_value(this.fieldNames.tradingName, this._company.alias);
      frm.set_value(this.fieldNames.companyName, this._company.name);
    });

    this._addHandler(this.fieldNames.taxId, async (frm: FrappeForm) => {
      const type = frm.doc[this.fieldNames.type] || "";
      if (type != "Company") return;

      const tax_id = frm.doc[this.fieldNames.taxId] || "";
      const tax_id_digits = tax_id.replace(/\D+/g, "");

      if (tax_id_digits.length < 14) return;

      if (this._company && this._company.tax_id === tax_id_digits) {
        frm.set_value(this.fieldNames.tradingName, this._company.alias);
        frm.set_value(this.fieldNames.companyName, this._company.name);
        return;
      }

      this._freezeDom(`Buscando o CNPJ ${tax_id}...`);

      const cnpj_service = new CnpjService();
      const resp = await cnpj_service.fetch(tax_id_digits) as any;

      this._unfreezeDom();

      if (!resp.success)
        this._exception(FetchCompanyException.invalidTaxId(tax_id));

      const data = resp.payload;

      this._company = Company.fromJSON({
        tax_id: data.taxId,
        alias: data.alias,
        name: data.company.name,
        updated_at: data.updated,
      })

      frm.set_value(this.fieldNames.tradingName, this._company.alias);
      frm.set_value(this.fieldNames.companyName, this._company.name);
    });

    this._addHandler("refresh", (frm: FrappeForm) => {
      frm.fields_dict[this.fieldNames.taxId].$input.on("input", (e: any) => {
        const tax_id = frm.doc[this.fieldNames.taxId] || "";
        if (tax_id.length >= 18 && e.target.value.length >= 18) return;
        frm.set_value(this.fieldNames.tradingName, "");
        frm.set_value(this.fieldNames.companyName, "");
      });
    });
  }
}