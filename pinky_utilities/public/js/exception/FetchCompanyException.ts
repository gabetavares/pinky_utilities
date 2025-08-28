import { ExceptionInterface } from "../types/Exception";
import { Exception } from "./Exception";

export default class FetchCompanyException extends Exception {
  constructor(data: ExceptionInterface) {
    super(data);
  }

  public static couldNotFetch(taxId: string): FetchCompanyException {
    return new FetchCompanyException({
      name: "Serviço indisponível",
      code: "COMPANY.TAX_ID.UNKNOWN",
      message: "Não foi possível encontrar o CNPJ digitado.",
      meta: { taxId }
    });
  }

  public static invalidTaxId(taxId: string): FetchCompanyException {
    return new FetchCompanyException({
      name: "CNPJ inválido",
      code: "COMPANY.TAX_ID.INVALID",
      message: "O CNPJ digitado não é válido.",
      meta: { taxId }
    });
  }

  public static unavailableService(): FetchCompanyException {
    return new FetchCompanyException({
      name: "Serviço indisponível",
      code: "COMPANY.TAX_ID.UNAVAILABLE",
      message: "O serviço de busca de CNPJ não está disponível no momento, tente novamente mais tarde.",
    });
  }
}