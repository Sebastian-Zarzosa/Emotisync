import { Crisis } from "./Crisis";
import { Sintoma } from "./sintoma";

export class CrisisSintoma {
    id: number = 0;
    sever: number = 0;
    observacion: number = 0;
    notas: string = "";
    crisis: Crisis = new Crisis();
    sintoma: Sintoma = new Sintoma();
}