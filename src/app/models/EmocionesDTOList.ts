import { Crisis } from "./crisis";

export class EmocionesDTOList {
    idEmociones: number = 0;
    tipoEmocion: string = '';
    intensidad: number=0;
    crisis: Crisis = new Crisis();
}
