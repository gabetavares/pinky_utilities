import { default as FetchCompanyBinder } from "./forms/FetchCompanyBinder";
import { default as TaxIdMaskBinder } from "./forms/TaxIdMaskBinder";
import { default as UpdateTaxLabelBinder } from "./forms/UpdateTaxLabelBinder";

frappe.provide("Pinky.Forms");
Pinky.Forms.UpdateTaxLabelBinder = UpdateTaxLabelBinder;
Pinky.Forms.TaxIdMaskBinder = TaxIdMaskBinder;
Pinky.Forms.FetchCompanyBinder = FetchCompanyBinder;
