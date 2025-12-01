import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-informacion',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './informacion.html',
  styleUrls: ['./informacion.css']
})
export class InformacionComponent {
  
  // Función para abrir más info en una pestaña nueva (simulando el botón del mockup)
  abrirFuenteExterna() {
    window.open('https://www.apa.org/topics/emotions', '_blank');
  }
}