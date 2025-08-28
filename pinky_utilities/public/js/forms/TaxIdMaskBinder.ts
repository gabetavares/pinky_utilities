import "imask";

import TaxIdMask from "../input_mask/TaxIdMask";
import { Frappe } from "../types/Frappe";
import { FormEventInterface } from "../types/frappe_forms/FormsApi";
import { TaxIdMaskBinderFields, TaxIdMaskBinderOptions } from "../types/frappe_forms/TaxIdMaskBinderTypes";
import FrappeFormEvent from "./FrappeFormEvent";

export default class TaxIdMaskBinder extends FrappeFormEvent implements FormEventInterface {
  protected mask: TaxIdMask;
  protected data: { individual: { id: string }, company: { id: string } };
  public readonly fieldNames: Required<TaxIdMaskBinderFields>;

  constructor(frappe: Frappe, options: TaxIdMaskBinderOptions) {
    super(frappe, options.formName);
    const { taxId = "tax_id", ...fieldNames } = options.fieldNames;
    this.fieldNames = { taxId, ...fieldNames }
    this.mask = new TaxIdMask(TaxIdMask.company_config());
    this.data = { individual: { id: "" }, company: { id: "" } };
  }

  protected _reloadMask(type: string) {
    if (type === "Company") {
      this.mask.reload(TaxIdMask.company_config());
      return
    }

    this.mask.reload(TaxIdMask.individual_config());
  }

  public registerHandlers(): void {
    this._addHandler(this.fieldNames.type, (frm) => {
      const type = frm.doc[this.fieldNames.type] || "";
      this._reloadMask(type);

      if (type === "Company") {
        frm.set_value(this.fieldNames.taxId, this.data.company.id);
      } else {
        frm.set_value(this.fieldNames.taxId, this.data.individual.id);
      }

      const input = frm.fields_dict[this.fieldNames.taxId].$input[0];
      this.mask.refresh(input, frm.doc[this.fieldNames.taxId] || "");
    })

    this._addHandler(this.fieldNames.taxId, (frm) => {
      const type = frm.doc[this.fieldNames.type] || "";
      const taxId = frm.doc[this.fieldNames.taxId] || "";
      if (type === "Company") this.data.company.id = taxId;
      else this.data.individual.id = taxId;
    });

    this._addHandler("refresh", (frm) => {
      const customer_type = frm.doc[this.fieldNames.type] || "";
      this._reloadMask(customer_type);

      const tax_id = frm.doc[this.fieldNames.taxId] || "";
      if (customer_type === "Company") {
        this.data.company.id = tax_id;
      } else if (customer_type === "Individual") {
        this.data.individual.id = tax_id;
      } else {
        this.data.company.id = tax_id;
        this.data.individual.id = tax_id;
      }

      const input = frm.fields_dict[this.fieldNames.taxId].$input[0];
      this.mask.refresh(input, frm.doc[this.fieldNames.taxId] || "");
    });
  }
}