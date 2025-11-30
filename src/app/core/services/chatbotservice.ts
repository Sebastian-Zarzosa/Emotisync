import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private url = `${environment.base}/chat`;

  constructor(private http: HttpClient) {}

  enviarMensaje(mensaje: string): Observable<any> {
    return this.http.post(this.url, { mensaje: mensaje });
  }
}