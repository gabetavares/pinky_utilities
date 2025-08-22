const address_cep = {
  cep: null,

  update_postcode_fields: (frm) => {
    const address_line1 = frm.doc.address_line1 || "";

    if (address_line1.trim().length === 0) {
      frm.set_df_property('address_line1', 'hidden', true);
      frm.set_df_property('address_line2', 'hidden', true);
      frm.set_df_property('city', 'hidden', true);
      frm.set_df_property('state', 'hidden', true);
      frm.set_df_property('country', 'hidden', true);
      frm.set_df_property('custom_complemento', 'hidden', true);
      frm.set_df_property('custom_número', 'hidden', true);

      frm.set_value('custom_complemento', "");
      frm.set_value('custom_número', "");
      return;
    }

    frm.set_df_property('address_line1', 'hidden', false);
    frm.set_df_property('address_line2', 'hidden', false);
    frm.set_df_property('city', 'hidden', false);
    frm.set_df_property('state', 'hidden', false);
    frm.set_df_property('country', 'hidden', false);
    frm.set_df_property('custom_complemento', 'hidden', false);
    frm.set_df_property('custom_número', 'hidden', false);
  },

  refresh_cep_data: (frm) => {
    const pincode = (frm.doc.pincode || "").replace(/\D+/g, "");

    if (pincode.length < 8) {
      address_cep.cep = null;
    } else {
      const curr_postcode = address_cep.cep ? address_cep.cep.postcode.replace(/\D+/g, "") : "";

      if (curr_postcode !== pincode) {
        address_cep.cep = Pinky.Helpers.Cep.fromJSON({
          postcode: frm.doc.pincode,
          street: frm.doc.address_line1,
          neighbourhood: frm.doc.address_line2,
          city: frm.doc.city,
          state_name: frm.doc.state,
        });
      }
    }
  }
}

frappe.ui.form.on('Address', {
  pincode: async function (frm) {
    const pincode = (frm.doc.pincode || "").replace(/\D+/g, '');
    if (pincode.length < 8) return;

    const curr_cep = address_cep.cep ?
      address_cep.cep.postcode.replace(/\D+/g, "") :
      ""

    if (pincode === curr_cep) {
      frm.set_value("address_line1", address_cep.cep.street);
      frm.set_value("address_line2", address_cep.cep.neighbourhood);
      frm.set_value("city", address_cep.cep.city);
      frm.set_value("state", address_cep.cep.state_name);
      return;
    }

    frappe.dom.freeze(`Buscando o CEP ${frm.doc.pincode}...`);

    const cep_service = new Pinky.Service.CepService();
    const data = await cep_service.fetch(pincode);

    frappe.dom.unfreeze();

    if (!data.success)
      frappe.throw(__(data.payload.message));

    address_cep.cep = Pinky.Helpers.Cep.fromJSON(data.payload);

    frm.set_value("address_line1", address_cep.cep.street);
    frm.set_value("address_line2", address_cep.cep.neighbourhood);
    frm.set_value("city", address_cep.cep.city);
    frm.set_value("state", address_cep.cep.state_name);
  },

  address_line1: function (frm) {
    address_cep.update_postcode_fields(frm);
  },

  refresh: function (frm) {
    address_cep.update_postcode_fields(frm);
    address_cep.refresh_cep_data(frm);

    const input = frm.fields_dict.pincode.$input;

    input.on("input", (e) => {
      const postcode = e.target.value.replace(/\D+/g, '');

      if (postcode.length >= 8) return;

      frm.set_value("address_line1", "");
      frm.set_value("address_line2", "");
      frm.set_value("city", "");
      frm.set_value("state", "");
    });
  },

  validate: function (frm) {
    const pincode = (frm.doc.pincode || "").replace(/\D+/g, "");
    if (pincode.length < 8)
      frappe.throw({
        title: __("CEP inválido"),
        message: __("O campo CEP é obrigatório e deve ser válido.")
      })
  }
})