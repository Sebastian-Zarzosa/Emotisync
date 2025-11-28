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
    { 
      id: 1, 
      titulo: 'Memoria Emocional', 
      descripcion: 'Encuentra los pares de emociones iguales.', 
      dificultad: 1, 
      imagen: '/img/memoriaEmocional.jpg' ,
      url: 'https://wordwall.net/es/resource/25555774/juego-de-la-memoria-emociones'
    },
    { 
      id: 2, 
      titulo: 'Sopa de Letras de Emociones', 
      descripcion: 'Encuentra las palabras escondidas en esta sopa de letras', 
      dificultad: 2, 
      imagen: '/img/SopaDeLetras.png',
      url: 'https://wordwall.net/es/resource/56782828/sopa-de-letras-de-las-emociones'
    },
    { 
      id: 3, 
      titulo: 'Juego de las emociones', 
      descripcion: 'Gira y responde las preguntas a ti mismo', 
      dificultad: 1, 
      imagen: '/img/RuletaEmociones.png' ,
      url: 'https://wordwall.net/es/resource/18263529/juego-de-las-emociones'
    }
  ];

  navegarAJuego(url: string) {
    if(url){
      window.open(url, '_blank')
    }
  }
}