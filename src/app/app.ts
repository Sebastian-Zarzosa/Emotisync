import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Inicio } from './components/inicio/inicio';
import { Conocer } from './components/conocer/conocer';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Inicio, Conocer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'emotisync';
}
