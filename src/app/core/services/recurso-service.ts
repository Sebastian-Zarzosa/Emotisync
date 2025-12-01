import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'; // <--- Agregar HttpParams
import { Subject, Observable } from 'rxjs'; // <--- Agregar Observable
import { environment } from '../../../environments/environment';
import { Recurso } from '../../models/recurso';
// Importamos los nuevos DTOs
import { RecursoPromedioDTO } from '../../models/RecursoPromedioDTO';
import { RecursoRelacionDTO } from '../../models/RecursoRelacionDTO';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class RecursoService {
  private url = `${base_url}/recursos`;
  private listaCambio = new Subject<Recurso[]>();

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Recurso[]>(this.url);
  }

  insert(r: Recurso) {
    return this.http.post(this.url, r, { responseType: 'text' });
  }

  update(r: Recurso) {
    return this.http.put(this.url, r, { responseType: 'text' });
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }

  listId(id: number) {
    return this.http.get<Recurso>(`${this.url}/${id}`);
  }

  setList(listaNueva: Recurso[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  // === NUEVOS MÉTODOS PARA REPORTES ===

  // 1. Obtener promedio de recursos por creador
  getPromedioRecursos(): Observable<RecursoPromedioDTO[]> {
    return this.http.get<RecursoPromedioDTO[]>(`${this.url}/promedio`);
  }

  // 2. Verificar relación (usa @RequestParam en el backend)
  verificarRelacion(creadorId: number, destinatarioId: number): Observable<RecursoRelacionDTO> {
    const params = new HttpParams()
      .set('creadorId', creadorId.toString())
      .set('destinatarioId', destinatarioId.toString());

    return this.http.get<RecursoRelacionDTO>(`${this.url}/relacion`, { params });
  }
}