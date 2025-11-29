import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { Crisis } from "../../models/Crisis";
import { QuantityDTOCrisis } from "../../models/QuantityDTOCrisis";
import { CrisisDTO } from "../../models/CrisisDTO";


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

    //agregando para reporte grafico
    getCantidadporusu(): Observable<QuantityDTOCrisis[]> {
        return this.http.get<QuantityDTOCrisis[]>(`${this.url}/cantidadporusu`);
    }

    //agregando para tabla filtrable con busqueda por ritmo
    getBuscarporritmo(ritmo:number): Observable<CrisisDTO[]> {
        return this.http.get<CrisisDTO[]>(`${this.url}/buscarporritmo`,
            {
            params: {
                ritmo: ritmo.toString() // ritmo es float
            }
        }
        );
    }
}