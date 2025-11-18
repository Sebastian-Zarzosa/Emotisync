import { Usuario } from "./Usuario"

export class Alerta { 
    idAlerta: number = 0
    tipo_alerta: string = ''
    mensaje: string = ''
    nivel_alerta: number = 0
    usuario: Usuario = new Usuario()
}
