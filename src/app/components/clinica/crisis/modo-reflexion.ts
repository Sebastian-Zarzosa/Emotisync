import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-modo-reflexion',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './modo-reflexion.html',
  styleUrls: ['./modo-reflexion.css']
})
export class ModoReflexionComponent implements OnInit, OnDestroy {
  mensaje: string = 'Prepárate...';
  fase: string = 'inicio'; // inicio, inhalar, retener, exhalar
  intervalo: any;
  
  // Configuración del ciclo (4-7-8 o simple)
  // Haremos un ciclo simple: 4s Inhalar, 4s Retener, 4s Exhalar
  
  ngOnInit(): void {
    this.iniciarCiclo();
  }

  iniciarCiclo() {
    this.fase = 'inhalar';
    this.mensaje = 'Inhala profundamente...';
    
    this.intervalo = setInterval(() => {
      this.cicloRespiracion();
    }, 12000); // Ciclo total de 12 segundos (4+4+4)
    
    // Iniciar el primer paso inmediatamente
    this.cicloRespiracion();
  }

  cicloRespiracion() {
    // 1. Inhalar (0s - 4s)
    this.fase = 'inhalar';
    this.mensaje = 'Inhala... 🌸';

    // 2. Retener (4s - 8s)
    setTimeout(() => {
      if (!this.intervalo) return; // Evitar ejecución si salió
      this.fase = 'retener';
      this.mensaje = 'Mantén el aire... 😐';
    }, 4000);

    // 3. Exhalar (8s - 12s)
    setTimeout(() => {
      if (!this.intervalo) return;
      this.fase = 'exhalar';
      this.mensaje = 'Exhala suavemente... 💨';
    }, 8000);
  }

  ngOnDestroy(): void {
    if (this.intervalo) {
      clearInterval(this.intervalo);
      this.intervalo = null;
    }
  }
}