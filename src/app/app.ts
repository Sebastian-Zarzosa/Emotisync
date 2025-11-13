import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Inicio } from './components/inicio/inicio';
import { Conocer } from './components/conocer/conocer';
import { Listarrol } from './components/rol/listarrol/listarrol';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Inicio, Conocer, Listarrol],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'emotisync';
}
