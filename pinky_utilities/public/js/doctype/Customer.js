new Pinky.Forms.UpdateTaxLabelBinder(frappe, {
  formName: "Customer",
  fieldNames: {
    type: "customer_type"
  }
}).register();

new Pinky.Forms.TaxIdMaskBinder(frappe, {
  formName: "Customer",
  fieldNames: {
    type: "customer_type"
  }
}).register();

new Pinky.Forms.FetchCompanyBinder(frappe, {
  formName: "Customer",
  fieldNames: {
    type: "customer_type"
  }
}).register();