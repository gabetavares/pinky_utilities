const customer_tax_id = new CustomerTaxId();

frappe.ui.form.on('Customer', {
  onload: function (frm) {
    load_script("https://unpkg.com/imask", {
      onload: () => {
        customer_tax_id.mask = customer_tax_id.create_mask(frm);
        if (customer_tax_id.mask === null)
          frappe.throw(__(`Erro ao inicializar as máscaras de PF/PJ.`));
      },

      onerror: () => {
        frappe.throw(__(`Erro ao inicializar as máscaras de PF/PJ.`));
      }
    });
  },

  customer_type: function (frm) {
    customer_tax_id.update_tax_id_label(frm);

    const customer_type = frm.doc.customer_type || "";

    if (customer_type === "Company") {
      customer_tax_id.update_cpf(frm.doc.tax_id || "");
      customer_tax_id.refresh_cnpj_mask();
      frm.set_value('tax_id', customer_tax_id.data.cnpj);
    } else {
      customer_tax_id.update_cnpj(frm.doc.tax_id || "");
      customer_tax_id.refresh_cpf_mask();
      frm.set_value('tax_id', customer_tax_id.data.cpf);
    }
  },

  refresh(frm) {
    customer_tax_id.update_tax_id_label(frm);

    const customer_type = frm.doc.customer_type || "";
    if (customer_type === "Company") {
      customer_tax_id.data.cnpj = frm.doc.tax_id || "";
    } else {
      customer_tax_id.data.cpf = frm.doc.tax_id || "";
    }
  },

  validate: function (frm) {
    const tax_id_length = (frm.doc.tax_id || '').replace(/\D+/g, "").length;

    if (frm.doc.customer_type === "Company" && tax_id_length !== 14) {
      frappe.throw(__('CNPJ inválido.'));
      return;
    }

    if (tax_id_length !== 11) {
      frappe.throw(__('CPF inválido.'));
    }
  }
})