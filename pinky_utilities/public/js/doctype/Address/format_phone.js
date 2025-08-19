const phone_mask = new PhoneMask(["phone", "fax"]);

frappe.ui.form.on('Address', {
  onload: function (frm) {
    load_script("https://unpkg.com/imask", {
      onload: () => {
        phone_mask.fields.forEach((field) => phone_mask.init(frm, field));
      }
    })
  },

  validate: function (frm) {
    phone_mask.fields.forEach((field) => phone_mask.validate(frm, field));
  },
});