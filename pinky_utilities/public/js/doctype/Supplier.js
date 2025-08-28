new Pinky.Forms.UpdateTaxLabelBinder(frappe, {
  formName: "Supplier",
  fieldNames: {
    type: "supplier_type"
  }
}).register();

new Pinky.Forms.TaxIdMaskBinder(frappe, {
  formName: "Supplier",
  fieldNames: {
    type: "supplier_type"
  }
}).register();

new Pinky.Forms.FetchCompanyBinder(frappe, {
  formName: "Supplier",
  fieldNames: {
    type: "supplier_type"
  }
}).register();