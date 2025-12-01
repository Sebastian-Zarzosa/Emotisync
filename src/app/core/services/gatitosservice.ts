import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface CatImage {
  id: string;
  url: string;
  width: number;
  height: number;
}

@Injectable({
  providedIn: 'root',
})
export class Gatitosservice {

  // Usamos inject para ser consistentes con tu proyecto
  private http = inject(HttpClient);
  
  private apiURL = "https://api.thecatapi.com/v1/images/search";
  // Tu API Key
  private apiKey = "live_S2VTjFOidn25WjJda1cikkrWOya38u5wKtWG5E82RInVd2rkk5fBjHQZz5yU51aW";

  constructor() {}

  obtenerGatitos(cantidad: number): Observable<CatImage[]> {
    const headers = new HttpHeaders({
      'x-api-key': this.apiKey
    });

    // Pedimos tamaño mediano (med) para que cargue rápido
    return this.http.get<CatImage[]>(
      `${this.apiURL}?limit=${cantidad}&size=med`, 
      { headers: headers }
    );
  }
}
