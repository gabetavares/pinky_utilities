const customer_fetch_company = {
  company: null,
}

frappe.ui.form.on('Customer', {
  customer_type(frm) {
    const customer_type = frm.doc.customer_type || "";
    if (customer_type != "Company" || customer_fetch_company.company == null) {
      frm.set_value("custom_nome_fantasia", "");
      frm.set_value("custom_nome_de_registro", "");
      return;
    }

    frm.set_value("custom_nome_fantasia", customer_fetch_company.company.alias);
    frm.set_value("custom_nome_de_registro", customer_fetch_company.company.name);
  },

  tax_id: async function (frm) {
    const customer_type = frm.doc.customer_type || "";
    if (customer_type != "Company") return;

    const tax_id = frm.doc.tax_id || "";
    const tax_id_digits = tax_id.replace(/\D+/g, "");

    if (tax_id_digits.length < 14) return;

    if (
      customer_fetch_company.company &&
      customer_fetch_company.company.tax_id === tax_id_digits
    ) {
      frm.set_value("custom_nome_fantasia", customer_fetch_company.company.alias);
      frm.set_value("custom_nome_de_registro", customer_fetch_company.company.name);
      return;
    }

    frappe.dom.freeze(`Buscando o CNPJ ${tax_id}...`);

    const cnpj_service = new Pinky.Service.CnpjService();
    const resp = await cnpj_service.fetch(tax_id_digits);

    frappe.dom.unfreeze();

    if (!resp.success) {
      frappe.throw(__("CNPJ Inválido"));
    }

    const data = resp.payload;

    customer_fetch_company.company = Pinky.Helpers.Company.fromJSON({
      tax_id: data.taxId,
      alias: data.alias,
      name: data.company.name,
      updated_at: data.updated,
    })

    frm.set_value("custom_nome_fantasia", customer_fetch_company.company.alias);
    frm.set_value("custom_nome_de_registro", customer_fetch_company.company.name);
  },

  refresh(frm) {
    frm.fields_dict.tax_id.$input.on("input", (e) => {
      const tax_id = frm.doc.tax_id || "";
      if (tax_id.length >= 18 && e.target.value.length >= 18) return;
      frm.set_value("custom_nome_fantasia", "");
      frm.set_value("custom_nome_de_registro", "");
    });
  }
})