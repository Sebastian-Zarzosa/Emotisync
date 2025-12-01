import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { Alerta } from '../../models/alertas';
import { UsuarioAlertaCountDTO, AlertasBusquedaDTO, UsuarioPromedioAlertasDTO, UsuarioAlertaDTO } from '../../models/alertasDTO';
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


   // 1. Conteo
    getConteoUsuarios(): Observable<UsuarioAlertaCountDTO[]> {
        return this.http.get<UsuarioAlertaCountDTO[]>(`${this.apiUrl}/conteo-usuarios`);
    }

    // 2. Búsqueda (Param: letra)
    buscarPorNombre(letra: string): Observable<AlertasBusquedaDTO[]> {
        const params = new HttpParams().set('letra', letra);
        return this.http.get<AlertasBusquedaDTO[]>(`${this.apiUrl}/buscar-por-nombre`, { params });
    }

    // 3. Promedio Crítico (Param: nivel)
    getPromedioCritico(nivel: number): Observable<UsuarioPromedioAlertasDTO[]> {
        const params = new HttpParams().set('nivel', nivel.toString());
        return this.http.get<UsuarioPromedioAlertasDTO[]>(`${this.apiUrl}/promedio-critico`, { params });
    }

    // 4. Alertas Críticas (Param: nivel, default 4)
    getAlertasCriticas(nivel: number = 4): Observable<UsuarioAlertaDTO[]> {
        const params = new HttpParams().set('nivel', nivel.toString());
        return this.http.get<UsuarioAlertaDTO[]>(`${this.apiUrl}/criticas`, { params });
    }
}