import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Subject } from 'rxjs';
import { planesSuscripcion } from '../../models/planes_suscripcionModel';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class PlanesSuscripcionService {
  private apiUrl = `${base_url}/planesSuscripcion`;
  private listaCambio = new Subject<planesSuscripcion[]>

  constructor(private http: HttpClient) { }
  
  //Metodo GET para obtener todos los planes de suscripcion
  list() {
    return this.http.get<planesSuscripcion[]>(this.apiUrl);
  }

  insert(p: planesSuscripcion) {
    return this.http.post(this.apiUrl, p);
  }

  //Establece los cambios
  setList(listaNueva: planesSuscripcion[]) {
    this.listaCambio.next(listaNueva);
  }

  //Observa cada cambio y retorna la lista
  getList() {
    return this.listaCambio.asObservable();
  }

  delete(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`, {responseType: 'text'});
  }

  update(p: planesSuscripcion) {
    return this.http.put(this.apiUrl, p, {responseType: 'text'});
  }

  listId(id: number) {
    return this.http.get<planesSuscripcion>(`${this.apiUrl}/${id}`);
  }
}
