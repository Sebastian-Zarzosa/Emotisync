import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

const base = environment.base;

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private url = `${base}/login`;

  constructor(private http: HttpClient) {}

  login(request: any) {
    return this.http.post(this.url, request);
  }

  verificar() {
    let token = sessionStorage.getItem('token');
    return token != null;
  }

  getRole(): string {
    let token = sessionStorage.getItem('token');
    if (!token) return '';

    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);

    return decodedToken?.role || '';
  }

  getUsername(): string {
    let token = sessionStorage.getItem('token');
    if (!token) return '';
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);

    return decodedToken?.sub || decodedToken?.nombre || 'Usuario';
  }

  isAdmin(): boolean {
    return this.getRole() === 'ADMIN';
  }

  isPaciente(): boolean {
    return this.getRole() === 'PACIENTE';
  }

  isEspecialista(): boolean {
    return this.getRole() === 'ESPECIALISTA';
  }

  isFamiliar(): boolean {
    return this.getRole() === 'FAMILIAR';
  }

  cerrarSesion() {
    sessionStorage.clear();
  }
}
