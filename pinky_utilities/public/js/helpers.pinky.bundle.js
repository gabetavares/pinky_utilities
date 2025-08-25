import { default as Cep } from "./helpers/Cep";
import { default as Company } from "./helpers/Company";

frappe.provide("Pinky.Helpers");
Pinky.Helpers.Cep = Cep;
Pinky.Helpers.Company = Company;

