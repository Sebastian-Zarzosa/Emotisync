import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { UsuarioListar } from './usuario-listar/usuario-listar';

@Component({
  selector: 'app-usuario',
  imports: [RouterOutlet, UsuarioListar],
  templateUrl: './usuario.html',
  styleUrl: './usuario.css',
})
export class Usuario {
  constructor(public route: ActivatedRoute) {}
}
