
import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { HttpClient } from "@angular/common/http";

const base  = environment.base

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    private url = `${base}/login`

    constructor(private http: HttpClient) { }

    login(request: any) {
        return this.http.post(this.url,request)
    }

    verificar() {
        return sessionStorage.getItem('ingreso') === 'true'
    }

    cerrarSesion() {
        sessionStorage.clear()
    }
}