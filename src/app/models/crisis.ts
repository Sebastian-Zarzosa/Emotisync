import { Usuario } from './Usuario';

export class Crisis {
  idCrisis: number = 0;
  fecha: Date = new Date();
  tiempoRespuesta: number = 0;
  ritmo: number = 0;
  articulacion: number = 0;
  f0_promedio: number = 0;
  formantesDetectados: string = '';
  usuario: Usuario = new Usuario(); // <-- Objeto anidado, igual que en Recurso
}