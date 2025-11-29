import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { Crisis } from "../../models/crisis";


const base_url=environment.base;

@Injectable({
  providedIn: "root",  
})
export class CrisisService{
    private url = `${base_url}/crisis`;
    private listaCambio = new Subject<Crisis[]>();
    constructor(private http: HttpClient) {}

    list() {
        return this.http.get<Crisis[]>(this.url);
    }

    insert(cri: Crisis) {
        return this.http.post(this.url, cri);
    }

    setList(listaNueva: Crisis[]) {
        return this.listaCambio.next(listaNueva);
    }
    getList() {
        return this.listaCambio.asObservable();
    }

    listId(id: number) {
        return this.http.get<Crisis>(`${this.url}/${id}`);
    }

    update(cri: Crisis) {
        return this.http.put(`${this.url}`, cri, { responseType: 'text' });
    }

    delete(id: number) {
        return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
    }   
}