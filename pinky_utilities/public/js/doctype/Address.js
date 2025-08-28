new Pinky.Forms.PhoneMaskBinder(frappe, {
  formName: "Address",
  phoneFields: ['phone', 'fax']
}).register();

new Pinky.Forms.PostalCodeMaskBinder(frappe, {
  formName: "Address",
}).register();

new Pinky.Forms.FetchPostalCodeBinder(frappe, {
  formName: "Address",
}).register();