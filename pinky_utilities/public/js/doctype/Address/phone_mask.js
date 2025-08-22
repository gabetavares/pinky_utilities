const PhoneMask = Pinky.Mask.PhoneMask;
const PhoneInputField = Pinky.Mask.PhoneInputField;

const masks = {
  phone: new PhoneMask(PhoneMask.config()),
  fax: new PhoneMask(PhoneMask.config()),
};

frappe.ui.form.on('Address', {
  refresh(frm) {
    PhoneInputField.create_input_events(frm, masks.phone, 'phone');
    PhoneInputField.create_input_events(frm, masks.fax, 'fax');
  }
})
