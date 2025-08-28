import CepMask from "../input_mask/CepMask";
import { Frappe } from "../types/Frappe";
import { FormEventInterface, PostalCodeMaskBinderFields, PostalCodeMaskBinderOptions } from "../types/frappe/FormsApi";
import FrappeFormEvent from "./FrappeFormEvent";

export default class PostalCodeMaskBinder extends FrappeFormEvent implements FormEventInterface {
  protected readonly _mask: CepMask;
  public readonly fieldNames: Required<PostalCodeMaskBinderFields>

  constructor(frappe: Frappe, options: PostalCodeMaskBinderOptions) {
    super(frappe, options.formName);
    this._mask = new CepMask(CepMask.config());

    const { pincode = "pincode", ...fieldNames } = options.fieldNames ?? {};
    this.fieldNames = { pincode, ...fieldNames };
  }

  public registerHandlers(): void {
    this._addHandler("refresh", (frm) => {
      const input = frm.fields_dict[this.fieldNames.pincode].$input[0];
      this._mask.refresh(input, frm.doc[this.fieldNames.pincode] || "");
    });
  }
}