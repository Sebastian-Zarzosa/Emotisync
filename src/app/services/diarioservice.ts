import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Diario } from '../models/Diario';
import { Subject } from 'rxjs';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class Diarioservice {
  private url = `${base_url}/diarios`;
  private listaCambio = new Subject<Diario[]>();

  constructor(private http: HttpClient) {}

  listar() {
    return this.http.get<Diario[]>(this.url);
  }

  insertar(diario: Diario) {
    return this.http.post(this.url, diario, { responseType: 'text' });
  }

  getLista() {
    return this.listaCambio.asObservable();
  }

  modificar(diario: Diario) {
    return this.http.put(`${this.url}`, diario, { responseType: 'text' });
  }

  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  setLista(listaNueva: Diario[]) {
    this.listaCambio.next(listaNueva);
  }

  listarId(id: number) {
    return this.http.get<Diario>(`${this.url}/${id}`);
  }
}
