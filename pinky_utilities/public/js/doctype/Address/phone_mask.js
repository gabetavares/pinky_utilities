const address_phone_masks = {
  phone: new Pinky.Mask.PhoneMask(Pinky.Mask.PhoneMask.config()),
  fax: new Pinky.Mask.PhoneMask(Pinky.Mask.PhoneMask.config()),
};

frappe.ui.form.on('Address', {
  refresh(frm) {
    Pinky.Mask.PhoneInputField.create_input_events(frm, address_phone_masks.phone, 'phone');
    Pinky.Mask.PhoneInputField.create_input_events(frm, address_phone_masks.fax, 'fax');
  }
})
