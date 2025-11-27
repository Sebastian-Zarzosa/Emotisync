import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Emociones } from '../../models/Emociones';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class Emocionesservice {
  private url = `${base_url}/emociones`;

  constructor(private http: HttpClient) {}

  listar() {
    return this.http.get<Emociones[]>(this.url);
  }
}
