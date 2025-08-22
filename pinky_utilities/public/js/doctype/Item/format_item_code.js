frappe.ui.form.on('Item', {
  refresh: function (frm) {
    const input = frm.fields_dict.item_code.$input;

    input.on("input", (e) => {
      e.target.value = Pinky.Item.format_item_code(e.target.value);
      frm.set_value('item_code', e.target.value);
    });
  },

  validate: function (frm) {
    if (frm.doc.item_code) {
      formatted = frm.doc.item_code.replace(/[-_\s]+$/g, "");
      frm.set_value('item_code', formatted);
    }
  },
});