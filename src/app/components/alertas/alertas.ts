import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { AlertasListar } from './alertas-listar/alertas-listar';

@Component({
  selector: 'app-alertas',
  imports: [RouterOutlet, AlertasListar],
  templateUrl: './alertas.html',
  styleUrl: './alertas.css',
})
export class Alertas {
  constructor(public route: ActivatedRoute) {}
}
