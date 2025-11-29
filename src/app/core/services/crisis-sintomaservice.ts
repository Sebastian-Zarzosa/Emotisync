import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { CrisisSintoma } from '../../models/CrisisSintoma';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class CrisisSintomaService {
  private url = `${base_url}/crisis-sintomas`;
  private listaCambio = new Subject<CrisisSintoma[]>();

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<CrisisSintoma[]>(this.url);
  }

  insert(cs: CrisisSintoma) {
    return this.http.post(this.url, cs, { responseType: 'text' });
  }

  listId(id: number) {
    return this.http.get<CrisisSintoma>(`${this.url}/${id}`);
  }

  update(cs: CrisisSintoma) {
    return this.http.put(this.url, cs, { responseType: 'text' });
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }

  setList(listaNueva: CrisisSintoma[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }
}