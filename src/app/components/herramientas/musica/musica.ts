import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MusicaService } from '../../../core/services/musicaservice';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatListModule } from "@angular/material/list";
import { PlayerService } from '../../../core/services/playerservice';
@Component({
  selector: 'app-musica',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule,
    MatFormFieldModule, 
    MatInputModule, 
    FormsModule,
    MatListModule
],
  templateUrl: './musica.html',
  styleUrls: ['./musica.css']
})
export class Musica implements OnInit {
  canciones: any[] = [];
  currentTrack: any = null;
  terminoBusqueda: string = ''; // Texto del buscador

  cargando: boolean = false

  // Categorías para elegir libremente
  generos = [
    { label: '🎹 Piano', value: 'piano' },
    { label: '🧘 Chillout', value: 'chillout' },
    { label: '🎸 Rock', value: 'rock' },
    { label: '🎷 Jazz', value: 'jazz' },
    { label: '🎻 Clásica', value: 'classical' },
    { label: '🌳 Ambiente', value: 'ambient' }
  ];

  constructor(
    private musicaService: MusicaService,
    private playerService: PlayerService
  ) {}

  ngOnInit(): void {
    this.buscarPorGenero('ambient'); // Carga inicial por defecto
  }

  // Opción 1: El usuario escribe y busca
  buscarLibre() {
    if (this.terminoBusqueda.trim()) {
      this.cargando = true;
      this.musicaService.searchTracks(this.terminoBusqueda).subscribe({
        next: (resp: any) => {
          this.canciones = resp.results;
          this.cargando = false;
        },
        error: (err) => {
          console.error(err);
          this.cargando = false;
        }
      });
    }
  }

  // Opción 2: El usuario elige un género (Chip)
  buscarPorGenero(tag: string) {
    this.cargando = true;
    this.musicaService.getTracksByTag(tag).subscribe({
      next: (resp: any) => {
        this.canciones = resp.results;
        this.cargando = false;
      },
      error: (err) => {
        console.error(err);
        this.cargando = false;
      }
    });
  }

  recomendarPorEmocion(emocion: string) {
    let tag = 'pop';
    switch(emocion) {
      case 'ansioso': tag = 'meditation'; break;
      case 'triste': tag = 'indie'; break;     
      case 'enojado': tag = 'classical'; break;
      case 'feliz': tag = 'dance'; break;      
      case 'neutro': tag = 'jazz'; break;
    }
    
    this.terminoBusqueda = '';
    this.buscarPorGenero(tag);
  }

  reproducir(track: any) {
    this.playerService.playTrack(track)
  }
}