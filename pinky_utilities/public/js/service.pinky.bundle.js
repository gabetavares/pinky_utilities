import { default as CepService } from "./services/CepService";

frappe.provide("Pinky.Service");
Pinky.Service.CepService = CepService;

