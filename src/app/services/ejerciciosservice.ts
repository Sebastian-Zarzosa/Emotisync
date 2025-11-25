import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Ejercicio } from '../models/ejercicio';
import { environment } from '../../environments/environment';

const base_url= environment.base;

@Injectable({
  providedIn: 'root',
})
export class Ejerciciosservice {
  private url = `${base_url}/ejercicios`;
  
  private listaCambio = new Subject<Ejercicio[]>();

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Ejercicio[]>(this.url);
  }

  insert(e: Ejercicio) {
    return this.http.post(this.url, e);
  }
  
  setList(listaNueva: Ejercicio[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    return this.http.get<Ejercicio>(`${this.url}/${id}`);
  }

  update(e: Ejercicio) {
    return this.http.put(this.url, e, { responseType: 'text' });
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }
  
}
