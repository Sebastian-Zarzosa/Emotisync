import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { Alerta } from '../models/alertas';
const base_url = environment.base;

@Injectable({
    providedIn: 'root',
})

export class AlertasService{
    private apiUrl = `${base_url}/alertas`;

    private listaCambio = new Subject<Alerta[]>();

    constructor(private http: HttpClient) { }

    list() {
        return this.http.get<Alerta[]>(this.apiUrl);
    }

    insert(a: Alerta) {
        return this.http.post(this.apiUrl, a);
    }

    //Establece los cambios
    setList(listaNueva: Alerta[]) {
        this.listaCambio.next(listaNueva);
    }

    //Observa cada cambio y retorna la lista
    getList() {
        return this.listaCambio.asObservable();
    }

    delete(id: number) {
        return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' });
    }

    update(a: Alerta) {
        return this.http.put(this.apiUrl, a, { responseType: 'text' });
    }

    listId(id: number) {
        return this.http.get<Alerta>(`${this.apiUrl}/${id}`);
    }
}