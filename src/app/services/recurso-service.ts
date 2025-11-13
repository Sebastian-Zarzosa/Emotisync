import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { Recurso } from '../models/recurso';

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
}
