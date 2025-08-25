const customer_tax_id_mask = {
  id: {
    individual: "",
    company: "",
  },

  mask: new Pinky.Mask.TaxIdMask(Pinky.Mask.TaxIdMask.individual_config()),

  reload_mask(customer_type) {
    if (customer_type === "Company") {
      customer_tax_id_mask.mask.reload(Pinky.Mask.TaxIdMask.company_config());
      return
    }

    customer_tax_id_mask.mask.reload(Pinky.Mask.TaxIdMask.individual_config());
  }
}

frappe.ui.form.on('Customer', {
  customer_type(frm) {
    const customer_type = frm.doc.customer_type || "";
    customer_tax_id_mask.reload_mask(customer_type);

    if (customer_type === "Company") {
      frm.set_value("tax_id", customer_tax_id_mask.id.company);
    } else {
      frm.set_value("tax_id", customer_tax_id_mask.id.individual);
    }

    const input = frm.fields_dict.tax_id.$input[0];
    customer_tax_id_mask.mask.refresh(input, frm.doc.tax_id || "");
  },

  tax_id(frm) {
    const customer_type = frm.doc.customer_type || "";
    const tax_id = frm.doc.tax_id;

    if (customer_type === "Company") {
      customer_tax_id_mask.id.company = tax_id;
    } else {
      customer_tax_id_mask.id.individual = tax_id;
    }
  },

  refresh(frm) {
    const customer_type = frm.doc.customer_type || "";
    customer_tax_id_mask.reload_mask(customer_type);

    const tax_id = frm.doc.tax_id || "";
    if (customer_type === "Company") {
      customer_tax_id_mask.id.company = tax_id;
    } else if (customer_type === "Individual") {
      customer_tax_id_mask.id.individual = tax_id;
    } else {
      customer_tax_id_mask.id.company = tax_id;
      customer_tax_id_mask.id.individual = tax_id;
    }

    const input = frm.fields_dict.tax_id.$input[0];
    customer_tax_id_mask.mask.refresh(input, frm.doc.tax_id || "");
  }
})