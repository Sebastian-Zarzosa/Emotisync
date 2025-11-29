import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { EmocionesList } from './emociones-list/emociones-list';

@Component({
  selector: 'app-emociones',
  imports: [RouterOutlet, EmocionesList],
  templateUrl: './emociones.html',
  styleUrl: './emociones.css',
})
export class Emociones {
  constructor(public route:ActivatedRoute) {}
}
