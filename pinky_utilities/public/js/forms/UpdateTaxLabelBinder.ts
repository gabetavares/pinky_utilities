import { Frappe, FrappeForm } from "../types/Frappe";
import { FormEventInterface } from "../types/frappe_forms/FormsApi";
import { UpdateTaxLabelBinderFields, UpdateTaxLabelBinderOptions } from "../types/frappe_forms/UpdateTaxLabelBinderTypes";
import FrappeFormEvent from "./FrappeFormEvent";

export default class UpdateTaxLabelBinder extends FrappeFormEvent implements FormEventInterface {
  public readonly fieldNames: Required<UpdateTaxLabelBinderFields>;

  constructor(frappe: Frappe, options: UpdateTaxLabelBinderOptions) {
    super(frappe, options.formName);
    const { taxId = "tax_id", ...fieldNames } = options.fieldNames;
    this.fieldNames = { taxId, ...fieldNames };
  }

  private _field_label_policy(frm: FrappeForm): string {
    const type = frm.doc[this.fieldNames.type] || "";
    return type === "Company" ? "CNPJ" : "CPF";
  }

  private _set_field_label(frm: FrappeForm) {
    frm.set_df_property(this.fieldNames.taxId, 'label', this._field_label_policy(frm));
  }

  public registerHandlers(): void {
    this._addHandler(this.fieldNames.type, (frm: FrappeForm) => {
      this._set_field_label(frm);
    });

    this._addHandler("refresh", (frm: FrappeForm) => {
      this._set_field_label(frm);
    })
  }
}