import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { Crisis } from '../models/crisis';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class CrisisService {
  private url = `${base_url}/crisis`; // Basado en tu CrisisController
  private listaCambio = new Subject<Crisis[]>();

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Crisis[]>(this.url);
  }

  insert(c: Crisis) {
    // Tu controller espera un DTO, el objeto Crisis (con usuario anidado) es compatible
    return this.http.post(this.url, c, { responseType: 'text' });
  }

  update(c: Crisis) {
    return this.http.put(this.url, c, { responseType: 'text' });
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }

  listId(id: number) {
    return this.http.get<Crisis>(`${this.url}/${id}`);
  }

  setList(listaNueva: Crisis[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }
}