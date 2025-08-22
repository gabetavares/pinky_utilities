import "imask";

import { default as CepMask } from "./input_mask/CepMask";
import { default as PhoneInputField } from "./input_mask/PhoneInputField";
import { default as PhoneMask } from "./input_mask/PhoneMask";

frappe.provide("Pinky.Mask");
Pinky.Mask.PhoneMask = PhoneMask;
Pinky.Mask.PhoneInputField = PhoneInputField;
Pinky.Mask.CepMask = CepMask;
