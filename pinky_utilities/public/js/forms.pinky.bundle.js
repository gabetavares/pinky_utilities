import { default as FetchCompanyBinder } from "./forms/FetchCompanyBinder";
import { default as FetchPostalCodeBinder } from "./forms/FetchPostalCodeBinder";
import { default as ItemCodeBinder } from "./forms/ItemCodeBinder";
import { default as PhoneMaskBinder } from "./forms/PhoneMaskBinder";
import { default as PostalCodeMaskBinder } from "./forms/PostalCodeMaskBinder";
import { default as TaxIdMaskBinder } from "./forms/TaxIdMaskBinder";
import { default as UpdateTaxLabelBinder } from "./forms/UpdateTaxLabelBinder";

frappe.provide("Pinky.Forms");
Pinky.Forms.UpdateTaxLabelBinder = UpdateTaxLabelBinder;
Pinky.Forms.TaxIdMaskBinder = TaxIdMaskBinder;
Pinky.Forms.FetchCompanyBinder = FetchCompanyBinder;
Pinky.Forms.PhoneMaskBinder = PhoneMaskBinder;
Pinky.Forms.PostalCodeMaskBinder = PostalCodeMaskBinder;
Pinky.Forms.FetchPostalCodeBinder = FetchPostalCodeBinder;
Pinky.Forms.ItemCodeBinder = ItemCodeBinder;
