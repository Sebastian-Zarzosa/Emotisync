import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Inicio } from './components/inicio/inicio';
import { Conocer } from './components/conocer/conocer';
import { Listarrol } from './components/rol/listarrol/listarrol';
import { Menu } from './components/menu/menu';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Menu],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'emotisync';
}
