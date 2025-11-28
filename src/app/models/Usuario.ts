import { Rol } from './rol';

export class Usuario {
  idUsuario: number = 0;
  nombre: string = '';
  apellido: string = '';
  password: string = '';
  email: string = '';
  telefono: string = '';
  fechaNacimiento: Date = new Date();
  institucion: string = '';
  nroColegiatura: number = 0;
  especialidad: string = '';
  familiar: Usuario | undefined;
  especialista: Usuario | undefined;
  roles: Rol[] = [];
  username: string = '';
  enabled: boolean = true;
}
