import { default as CepService } from "./services/CepService";
import { default as CnpjService } from "./services/CnpjService";

frappe.provide("Pinky.Service");
Pinky.Service.CepService = CepService;
Pinky.Service.CnpjService = CnpjService;
