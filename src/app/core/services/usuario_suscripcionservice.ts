import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Subject, Observable } from 'rxjs';
import { usuarioSuscripcion } from '../../models/usuario_suscripcion';
// Importamos los nuevos DTOs
import { SuscripcionesActivasInfoUsuarioDTO } from '../../models/SuscripcionesActivasInfoUsuarioDTO';
import { HistorialSuscripcionesPorUsuarioDTO } from '../../models/HistorialSuscripcionesPorUsuarioDTO';
import { RendimientoPlanesDTO } from '../../models/RendimientoPlanesDTO';
import { MenosSuscriptoresActivosDTO } from '../../models/MenosSuscriptoresActivosDTO';

const base_url = environment.base;

@Injectable({
    providedIn: 'root',
})
export class UsuarioSuscripcionService {
    private apiUrl = `${base_url}/usuarioSuscripcion`;
    private listaCambio = new Subject<usuarioSuscripcion[]>();

    constructor(private http: HttpClient) { }

    // === MÉTODOS CRUD ===
    list() { return this.http.get<usuarioSuscripcion[]>(this.apiUrl); }
    
    insert(u: usuarioSuscripcion) { return this.http.post(this.apiUrl, u); }
    
    update(u: usuarioSuscripcion) { return this.http.put(this.apiUrl, u, { responseType: 'text' }); }
    
    delete(id: number) { return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' }); }
    
    listId(id: number) { return this.http.get<usuarioSuscripcion>(`${this.apiUrl}/${id}`); }
    
    listarPorUsuario(username: string) { return this.http.get<usuarioSuscripcion[]>(this.apiUrl); } // El backend filtra por token

    setList(listaNueva: usuarioSuscripcion[]) { this.listaCambio.next(listaNueva); }
    getList() { return this.listaCambio.asObservable(); }

    // === REPORTES ===

    // 1. Suscripciones Activas (Tabla)
    buscarActivos(): Observable<SuscripcionesActivasInfoUsuarioDTO[]> {
        return this.http.get<SuscripcionesActivasInfoUsuarioDTO[]>(`${this.apiUrl}/usuarioActivoQuery`);
    }

    // 2. Historial por Email (Búsqueda)
    buscarPorEmail(email: string): Observable<HistorialSuscripcionesPorUsuarioDTO[]> {
        return this.http.get<HistorialSuscripcionesPorUsuarioDTO[]>(`${this.apiUrl}/historialSuscripcionesQuery/${email}`);
    }

    // 3. Rendimiento de Planes (Gráfico)
    buscarPlanRendimiento(): Observable<RendimientoPlanesDTO[]> {
        return this.http.get<RendimientoPlanesDTO[]>(`${this.apiUrl}/planRendimientoQuery`);
    }

    // 4. Menos Suscriptores (Gráfico)
    buscarMenosSuscriptores(): Observable<MenosSuscriptoresActivosDTO[]> {
        return this.http.get<MenosSuscriptoresActivosDTO[]>(`${this.apiUrl}/MenosSuscriptoresQuery`);
    }
}