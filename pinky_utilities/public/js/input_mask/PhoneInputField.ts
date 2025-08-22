import type { FrappeForm } from "../types/Frappe";
import type PhoneMask from "./PhoneMask";

export default abstract class PhoneInputField {
  protected constructor() { }

  public static create_input_events(
    frm: FrappeForm,
    phone_mask: PhoneMask,
    field: string
  ) {
    const input = frm.fields_dict[field].$input[0];
    phone_mask.refresh(input, frm.doc[field] || "");

    input.addEventListener('focus', () => {
      if (!input.value.startsWith('+55')) {
        phone_mask.update('+55 (');
      }
    });

    input.addEventListener('blur', () => {
      if (/^55$/.test(phone_mask.mask.unmaskedValue)) {
        phone_mask.update('');
        frm.set_value(field, '');
      }
    });

    input.addEventListener('keydown', (e: KeyboardEvent) => {
      const pos = input.selectionStart;

      if ((e.key === 'Backspace' || e.key === 'Delete') && pos <= 5) {
        phone_mask.update('+55 (');
        e.preventDefault();
      }
    });
  }
}