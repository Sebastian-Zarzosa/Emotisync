import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Emociones } from '../models/Emociones';
import { Subject } from 'rxjs';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class Emocionesservice {
  private url = `${base_url}/emociones`;
  private listaCambio = new Subject<Emociones[]>();
  constructor(private http: HttpClient) {}

  listar() {
    return this.http.get<Emociones[]>(this.url);
  }

  insert(emo: Emociones) {
    return this.http.post(this.url, emo, { responseType: 'text' });
  }
  
  setList(listaNueva: Emociones[]) {
    return this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }
  
  listId(id: number) {
    return this.http.get<Emociones>(`${this.url}/${id}`);
  }
  
  update(emo: Emociones) {
    return this.http.put(`${this.url}`, emo, { responseType: 'text' });
  }
  
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }   
}
