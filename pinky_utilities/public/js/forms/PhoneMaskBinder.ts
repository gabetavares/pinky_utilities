import PhoneMask from "../input_mask/PhoneMask";
import { Frappe, FrappeForm } from "../types/Frappe";
import { FormEventInterface } from "../types/frappe_forms/FormsApi";
import { PhoneMaskBinderOptions } from "../types/frappe_forms/PhoneMaskBinderTypes";
import FrappeFormEvent from "./FrappeFormEvent";

export default class PhoneMaskBinder extends FrappeFormEvent implements FormEventInterface {
  protected readonly _masks: Map<string, PhoneMask>

  constructor(frappe: Frappe, options: PhoneMaskBinderOptions) {
    super(frappe, options.formName);

    this._masks = new Map();
    for (const field of options.phoneFields)
      this._masks.set(field, new PhoneMask(PhoneMask.config()));
  }

  protected _createInputEvents(
    frm: FrappeForm,
    fieldName: string,
    mask: PhoneMask,
  ) {
    const input = frm.fields_dict[fieldName].$input[0];
    mask.refresh(input, frm.doc[fieldName] || "");

    input.addEventListener('focus', () => {
      if (!input.value.startsWith('+55')) {
        mask.update('+55 (');
      }
    });

    input.addEventListener('blur', () => {
      if (/^55$/.test(mask.mask.unmaskedValue)) {
        mask.update('');
        frm.set_value(fieldName, '');
      }
    });

    input.addEventListener('keydown', (e: KeyboardEvent) => {
      const pos = input.selectionStart;

      if ((e.key === 'Backspace' || e.key === 'Delete') && pos <= 5) {
        mask.update('+55 (');
        e.preventDefault();
      }
    });
  }

  public registerHandlers(): void {
    this._addHandler("refresh", (frm) => {
      for (const [field, mask] of this._masks.entries())
        this._createInputEvents(frm, field, mask);
    })
  }
}