frappe.ui.form.on('Item', {
  item_code: function (frm) {
    if (frm.doc.item_code) {
      frm.set_value('item_code', format_item_code(frm.doc.item_code));
    }
  },

  validate(frm) {
    if (frm.doc.item_code) {
      frm.set_value('item_code', format_item_code(frm.doc.item_code));
    }
  }
})