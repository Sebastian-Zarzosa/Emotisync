import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { UsuarioSuscripcionlistar } from './usuario-suscripcionlistar/usuario-suscripcionlistar';
@Component({
  selector: 'app-usuario-suscripcion',
  imports: [RouterOutlet, UsuarioSuscripcionlistar],
  templateUrl: './usuario-suscripcion.html',
  styleUrl: './usuario-suscripcion.css',
})
export class UsuarioSuscripcion {
  constructor(public route: ActivatedRoute) {}
}
