import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Usuario } from '../models/Usuario';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class Usuarioservice {
  private url = `${base_url}/usuarios`;
  private listaCambio = new Subject<Usuario[]>();

  constructor(private http: HttpClient) {}

  listar() {
    return this.http.get<Usuario[]>(this.url);
  }

  insertar(usuario: Usuario) {
    return this.http.post(this.url, usuario);
  }

  setLista(listaNueva: Usuario[]) {
    this.listaCambio.next(listaNueva);
  }

  getLista() {
    return this.listaCambio.asObservable();
  }

  getListaEspecialistas() {
    return this.http.get<Usuario[]>(`${this.url}/especialistas`);
  }

  getListaFamiliares() {
    return this.http.get<Usuario[]>(`${this.url}/familiares`);
  }

  listarId(id: number) {
    return this.http.get<Usuario>(`${this.url}/${id}`);
  }

  update(usuario: Usuario) {
    // PUT a /usuarios/{id} con el body del usuario
    return this.http.put(`${this.url}`, usuario, {
      responseType: 'text',
    });
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }
}
