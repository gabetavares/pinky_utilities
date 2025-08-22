const address_cep_masks = {
  cep: new Pinky.Mask.CepMask(Pinky.Mask.CepMask.config()),
}

frappe.ui.form.on('Address', {
  refresh(frm) {
    const input = frm.fields_dict.pincode.$input[0];
    address_cep_masks.cep.refresh(input, frm.doc.pincode || "");
  }
})