import { ExceptionInterface } from "../types/Exception";
import { Exception } from "./Exception";

export default class FetchPostalCodeException extends Exception {
  constructor(data: ExceptionInterface) {
    super(data);
  }

  public static couldNotFetch(postcode: string): FetchPostalCodeException {
    return new FetchPostalCodeException({
      name: "Serviço indisponível",
      code: "POSTALCODE.UNKNOWN",
      message: "Não foi possível encontrar o CEP digitado.",
      meta: { postcode }
    });
  }

  public static invalidPostcode(postcode: string): FetchPostalCodeException {
    return new FetchPostalCodeException({
      name: "CEP inválido",
      code: "POSTCODE.INVALID",
      message: "O CEP digitado não é válido.",
      meta: { postcode }
    });
  }

  public static mandatoryField(): FetchPostalCodeException {
    return new FetchPostalCodeException({
      name: "CEP inválido",
      code: "POSTCODE.MANDATORY_FIELD",
      message: "O campo CEP é obrigatório e deve ser válido.",
    });
  }

  public static unavailableService(): FetchPostalCodeException {
    return new FetchPostalCodeException({
      name: "Serviço indisponível",
      code: "POSTCODE.UNAVAILABLE",
      message: "O serviço de busca de CEP não está disponível no momento, tente novamente mais tarde.",
    });
  }
}