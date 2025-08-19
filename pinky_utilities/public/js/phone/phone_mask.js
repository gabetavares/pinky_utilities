class PhoneMask {
  fields = [];
  _validator = {};

  constructor(fields) {
    this.fields = fields;

    this._validator = fields.reduce((acc, field) => {
      acc[field] = {
        isValidMask: false,
        isMobile: false,
      };
      return acc;
    }, {});
  }

  validate(frm, field) {
    const isEmptyField = frm.fields_dict[field].$input.val().trim().length === 0;

    if (this._validator[field].isValidMask || isEmptyField) return;

    const labelName = frm.fields_dict[field].label_span.textContent;

    if (this._validator[field].isMobile) {
      frappe.throw(__(`Número de celular inválido para o campo ${labelName}.`));
      return;
    }

    frappe.throw(__(`Número de telefone inválido para o campo ${labelName}.`));
  }

  init(frm, field) {
    const inputField = frm.fields_dict[field].$input[0];

    const mask = IMask(inputField, {
      mask: [
        { mask: "+{55} (00) 0000-0000" },
        { mask: "+{55} (00) 00000-0000" }
      ],
      dispatch: function (appended, dynamicMasked) {
        const number = (dynamicMasked.value + appended).replace(/\D/g, "");
        return number.length > 12
          ? dynamicMasked.compiledMasks[1]
          : dynamicMasked.compiledMasks[0];
      }
    });

    mask.on('accept', () => {
      frm.set_value(field, mask.value);
      if (/^\d{4}9/g.test(mask.unmaskedValue)) {
        this._validator[field].isMobile = true;
        this._validator[field].isValidMask = mask.masked.isComplete && mask.unmaskedValue.length === 13;
        return;
      }

      this._validator[field].isMobile = false;
      this._validator[field].isValidMask = mask.masked.isComplete && mask.unmaskedValue.length === 12;
    });

    inputField.addEventListener('focus', () => {
      if (!inputField.value.startsWith('+55')) {
        mask.value = '+55 (';
      }
    });

    inputField.addEventListener('blur', () => {
      if (/^55$/.test(mask.unmaskedValue)) {
        mask.value = '';
        frm.set_value(field, '');
        this._validator[field].isValidMask = true;
      }
    });

    inputField.addEventListener('keydown', (e) => {
      const pos = inputField.selectionStart;
      if ((e.key === 'Backspace' || e.key === 'Delete') && pos <= 5) {
        mask.value = '+55 (';
        e.preventDefault();
      }
    });
  }
}
