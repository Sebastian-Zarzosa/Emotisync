import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { PlayerService } from '../../../core/services/playerservice';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { MatSliderModule } from '@angular/material/slider'; 
@Component({
  selector: 'app-reproductor',
  standalone: true,
  imports: [
    CommonModule, 
    MatIconModule, 
    MatButtonModule, 
    MatProgressBarModule,
    MatSliderModule
  ],
  templateUrl: './reproductor.html',
  styleUrls: ['./reproductor.css']
})
export class ReproductorComponent {
  // Inyectamos el servicio como público para usarlo en el HTML
  constructor(public playerService: PlayerService) {}

  onVolumeChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.playerService.setVolume(parseFloat(inputElement.value))
  }
}