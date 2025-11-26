import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Subject } from 'rxjs';
import { usuarioSuscripcion } from '../../models/usuario_suscripcion';
const base_url = environment.base;

@Injectable({
    providedIn: 'root',
})

export class UsuarioSuscripcionService {
    private apiUrl = `${base_url}/usuarioSuscripcion`;

    private listaCambio = new Subject<usuarioSuscripcion[]>();

    constructor(private http: HttpClient) { }

    list() {
        return this.http.get<usuarioSuscripcion[]>(this.apiUrl);
    }

    insert(u: usuarioSuscripcion) {
        return this.http.post(this.apiUrl, u);
    }

    //Establece los cambios
    setList(listaNueva: usuarioSuscripcion[]) {
        this.listaCambio.next(listaNueva);
    }

    //Observa cada cambio y retorna la lista
    getList() {
        return this.listaCambio.asObservable();
    }

    delete(id: number) {
        return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' });
    }

    update(u: usuarioSuscripcion) {
        return this.http.put(this.apiUrl, u, { responseType: 'text' });
    }

    listId(id: number) {
        return this.http.get<usuarioSuscripcion>(`${this.apiUrl}/${id}`);
    }
}