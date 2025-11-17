import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { PlanesSuscripcionlistar } from './planes-suscripcionlistar/planes-suscripcionlistar';

@Component({
  selector: 'app-planes-suscripcion',
  imports: [RouterOutlet, PlanesSuscripcionlistar],
  templateUrl: './planes-suscripcion.html',
  styleUrl: './planes-suscripcion.css',
})
export class PlanesSuscripcion {
  constructor(public route: ActivatedRoute) {}
}