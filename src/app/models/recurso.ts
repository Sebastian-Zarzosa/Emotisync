import { Usuario } from './Usuario';

export class Recurso {
  id: number = 0;
  titulo: string = '';
  descripcion: string = '';
  enlace: string = '';
  tipo: string = '';
  fechaCr: Date = new Date();
  creador: Usuario = new Usuario();
  destinatario: Usuario = new Usuario();
  esPublico: boolean = false;
}
