import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-modo-reflexion',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './modo-reflexion.html',
  styleUrls: ['./modo-reflexion.css']
})
export class ModoReflexionComponent implements OnDestroy {
  isActive = false;
  isInhaling = true; // true = Inhala (grande), false = Exhala (pequeño)
  instructionText = 'Presiona Play';
  timerText = '00:00';
  intervalId: any;
  seconds = 0;

  toggleBreathing() {
    this.isActive = !this.isActive;
    
    if (this.isActive) {
      this.startSession();
    } else {
      this.pauseSession();
    }
  }

  startSession() {
    this.instructionText = 'Inhala...';
    this.isInhaling = true;

    // Cambia entre Inhala/Exhala cada 4 segundos
    this.intervalId = setInterval(() => {
      this.seconds++;
      this.timerText = this.formatTime(this.seconds);

      // Ciclo de 4 segundos para respiración cuadrada simple
      if (this.seconds % 4 === 0) {
        this.isInhaling = !this.isInhaling;
        this.instructionText = this.isInhaling ? 'Inhala...' : 'Exhala...';
      }
    }, 1000);
  }

  pauseSession() {
    clearInterval(this.intervalId);
    this.instructionText = 'Pausado';
  }

  stopBreathing() {
    this.pauseSession();
    this.isActive = false;
    this.seconds = 0;
    this.timerText = '00:00';
    this.instructionText = 'Listo para empezar';
    this.isInhaling = true; // Reset al tamaño original
  }

  formatTime(sec: number): string {
    const minutes = Math.floor(sec / 60);
    const seconds = sec % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  ngOnDestroy() {
    if (this.intervalId) clearInterval(this.intervalId);
  }
}