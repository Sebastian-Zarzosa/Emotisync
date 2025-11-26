import { Ejercicio } from "./ejercicio"
import { Usuario } from "./Usuario"

export class usuarioEjercicio {
    idUsuarioEjercicio: number = 0
    usuario: Usuario = new Usuario()
    ejercicio: Ejercicio = new Ejercicio()
    fechaRealizacion: Date = new Date()
    resultado: string = ''
}