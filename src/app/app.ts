import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Usuario } from './components/usuario/usuario';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Usuario],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'emotisync';
}
