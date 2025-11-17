import { Emociones } from './Emociones';
import { Usuario } from './Usuario';

export class Diario {
  idDiario: number = 0;
  titulo: string = '';
  contenido: string = '';
  fecha: Date = new Date();
  usuario: Usuario = new Usuario();
  emociones: Emociones = new Emociones();
}
