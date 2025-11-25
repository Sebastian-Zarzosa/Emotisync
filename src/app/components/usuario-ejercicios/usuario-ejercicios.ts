import { Component } from '@angular/core';
import { UsuarioEjercicioslistar } from './usuario-ejercicioslistar/usuario-ejercicioslistar';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-usuario-ejercicios',
  imports: [RouterOutlet, UsuarioEjercicioslistar],
  templateUrl: './usuario-ejercicios.html',
  styleUrl: './usuario-ejercicios.css',
})
export class UsuarioEjercicios {
  constructor(public route: ActivatedRoute) {}
}
