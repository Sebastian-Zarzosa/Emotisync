import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MusicaService {
  private clientId = 'cfb4b893'; 
  
  private apiUrl = 'https://api.jamendo.com/v3.0';

  constructor(private http: HttpClient) {}

  // Buscar por Etiquetas (Tags)
  getTracksByTag(tag: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/tracks/?client_id=${this.clientId}&format=jsonpretty&limit=50&tags=${tag}&include=musicinfo&imagesize=300`);
  }

  // Buscar por Texto
  searchTracks(query: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/tracks/?client_id=${this.clientId}&format=jsonpretty&limit=50&namesearch=${query}&include=musicinfo&imagesize=300`);
  }
}