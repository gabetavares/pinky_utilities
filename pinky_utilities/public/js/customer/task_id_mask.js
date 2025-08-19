class CustomerTaxId {
  mask = null;

  data = {
    cpf: "",
    cnpj: "",
  }

  constructor() {
  }

  update_cpf(value) {
    this.data.cpf = value;
  }

  update_cnpj(value) {
    this.data.cnpj = value;
  }

  refresh_cpf_mask() {
    this.mask.value = this.data.cpf;
    this.mask.updateValue();
  }

  refresh_cnpj_mask() {
    this.mask.value = this.data.cnpj;
    this.mask.updateValue();
  }

  create_mask(frm) {
    const input_field = frm.fields_dict.tax_id.$input;

    return IMask(input_field[0], {
      mask: [
        { mask: "00.000.000/0000-00" },
        { mask: "000.000.000-00" }
      ],
      dispatch: (_, dynamicMasked) => {
        const customer_type = frm.doc.customer_type || "";
        return customer_type === "Company"
          ? dynamicMasked.compiledMasks[0]
          : dynamicMasked.compiledMasks[1];
      }
    });
  }

  update_tax_id_label(frm) {
    const customer_type = frm.doc.customer_type || "";

    if (customer_type === "Company") {
      frm.set_df_property("tax_id", "label", __("CNPJ"));
    } else {
      frm.set_df_property("tax_id", "label", __("CPF"));
    }

    frm.refresh_field("tax_id");
  }
}