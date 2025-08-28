import { Frappe } from "../types/Frappe";
import { FormEventInterface } from "../types/frappe_forms/FormsApi";
import { ItemCodeBinderFields, ItemCodeBinderOptions } from "../types/frappe_forms/ItemCodeBinderTypes";
import FrappeFormEvent from "./FrappeFormEvent";

export default class ItemCodeBinder extends FrappeFormEvent implements FormEventInterface {
  public readonly fieldNames: Required<ItemCodeBinderFields>;

  constructor(frappe: Frappe, options: ItemCodeBinderOptions) {
    super(frappe, options.formName);
    const { itemCode = "item_code", ...fieldNames } = options.fieldNames ?? {}
    this.fieldNames = { itemCode, ...fieldNames };
  }

  protected _format(code: string): string {
    return (code || '')
      .toString()
      .replace(/^[-_\s]+/, '')
      .replace(/[_-\s]+/g, '-')
      .toUpperCase();
  }

  public registerHandlers(): void {
    this._addHandler("refresh", (frm) => {
      const input = frm.fields_dict[this.fieldNames.itemCode].$input;

      input.on("input", (e: any) => {
        e.target.value = this._format(e.target.value);
        frm.set_value('item_code', e.target.value);
      });
    })

    this._addHandler("validate", (frm) => {
      if (frm.doc[this.fieldNames.itemCode]) {
        const formatted = frm.doc[this.fieldNames.itemCode].replace(/[-_\s]+$/g, "");
        frm.set_value('item_code', formatted);
      }
    })
  }
}