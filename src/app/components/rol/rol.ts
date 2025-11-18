import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Listarrol } from './listarrol/listarrol';
import { Menu } from '../menu/menu';

@Component({
  selector: 'app-rol',
  imports: [RouterOutlet, Listarrol, Menu],
  templateUrl: './rol.html',
  styleUrl: './rol.css',
})
export class Rol {
  constructor(public route:ActivatedRoute) {}
}

