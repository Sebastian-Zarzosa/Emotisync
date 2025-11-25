import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { usuarioEjercicio } from '../models/usuario-ejercicio';
import { environment } from '../../environments/environment';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class UsuarioEjerciciosService {
  private apiUrl = `${base_url}/usuarioejercicios`;
  private listaCambio = new Subject<usuarioEjercicio[]>
  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<usuarioEjercicio[]>(this.apiUrl);
  }

  insert(e: usuarioEjercicio) {
    return this.http.post(this.apiUrl, e);
  }

  setList(listaNueva: usuarioEjercicio[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  delete(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`, {responseType: 'text'});
  }

  update(e: usuarioEjercicio) {
    return this.http.put(this.apiUrl, e, {responseType: 'text'});
  }

  listId(id: number) {
    return this.http.get<usuarioEjercicio>(`${this.apiUrl}/${id}`);
  }
}
