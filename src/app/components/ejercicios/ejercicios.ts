import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Ejerciciolistar } from './ejerciciolistar/ejerciciolistar';

@Component({
  selector: 'app-ejercicios',
  imports: [RouterOutlet,Ejerciciolistar],
  templateUrl: './ejercicios.html',
  styleUrl: './ejercicios.css',
})
export class Ejercicios {
  constructor(public route:ActivatedRoute) {}
}
