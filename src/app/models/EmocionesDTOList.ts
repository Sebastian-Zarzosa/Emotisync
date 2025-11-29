import { Crisis } from "./Crisis";

export class EmocionesDTOList {
    idEmociones: number = 0;
    tipoEmocion: string = '';
    intensidad: number=0;
    crisis: Crisis = new Crisis();
}
