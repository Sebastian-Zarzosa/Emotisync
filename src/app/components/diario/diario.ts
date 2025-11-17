import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { DiarioListar } from './diario-listar/diario-listar';

@Component({
  selector: 'app-diario',
  imports: [DiarioListar, RouterOutlet],
  templateUrl: './diario.html',
  styleUrl: './diario.css',
})
export class Diario {
  constructor(public route: ActivatedRoute) {}
}
