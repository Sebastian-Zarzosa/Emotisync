import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Sintoma } from '../models/sintoma';
import { Subject } from 'rxjs';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class Sintomaservice {
  private url = `${base_url}/sintomas`;
  private listaCambio = new Subject<Sintoma[]>();

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Sintoma[]>(this.url);
  }

  insert(s: Sintoma) {
    return this.http.post(this.url, s, { responseType: 'text' });
  }

  listId(id: number) {
    return this.http.get<Sintoma>(`${this.url}/${id}`);
  }

  update(s: Sintoma) {
    return this.http.put(`${this.url}`, s, { responseType: 'text' });
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }

  setList(listaNueva: Sintoma[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }
}
