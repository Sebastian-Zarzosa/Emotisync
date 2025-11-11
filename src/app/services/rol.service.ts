import { Subject } from "rxjs";
import { Rol } from "../models/rol";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";

const base_url=environment.base;

@Injectable({
  providedIn: "root",  
})
export class RolService{
    private url = `${base_url}/rol`;
  private listaCambio = new Subject<Rol[]>();

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Rol[]>(this.url);
  }

  insert(s: Rol) {
    return this.http.post(this.url, s);
  }

  setList(listaNueva: Rol[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    return this.http.get<Rol>(`${this.url}/${id}`);
  }

  update(s: Rol) {
    return this.http.put(`${this.url}`, s, { responseType: 'text' });
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }   
}