import { Rol } from './Rol';

export class Usuario {
  idUsuario: number = 0;
  nombre: string = '';
  apellido: string = '';
  email: string = '';
  telefono: string = '';
  fechaNacimiento: Date = new Date();
  institucion: string = '';
  nroColegiatura: number = 0;
  roles: Rol[] = [];
  especialidad: string = '';
  familiarId: number = 0;
  especialistaId: number = 0;
  enabled: boolean = true;
}
