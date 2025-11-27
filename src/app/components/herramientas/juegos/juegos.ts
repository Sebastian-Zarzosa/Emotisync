import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-juegos',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './juegos.html',
  styleUrls: ['./juegos.css']
})
export class JuegosComponent {
  juegos = [
    { id: 1, titulo: 'Memoria Emocional', descripcion: 'Encuentra los pares de emociones iguales.', dificultad: 1, imagen: 'assets/game1.png' },
    { id: 2, titulo: 'Adivina la Cara', descripcion: '¿Qué emoción expresa esta persona?', dificultad: 2, imagen: 'assets/game2.png' },
    { id: 3, titulo: 'Ruleta de la Calma', descripcion: 'Gira y realiza el ejercicio que toque.', dificultad: 1, imagen: 'assets/game3.png' }
  ];
}