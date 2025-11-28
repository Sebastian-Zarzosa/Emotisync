import { planesSuscripcion } from "./planes_suscripcion"
import { Usuario } from "./Usuario"

export class usuarioSuscripcion {
    idUsuarioSuscripcion: number = 0
    usuario: Usuario = new Usuario()
    fechaInicio: Date = new Date()
    fechaFin: Date = new Date()
    estado: string = 'Activo'
    planesSuscripcion: planesSuscripcion = new planesSuscripcion()
}