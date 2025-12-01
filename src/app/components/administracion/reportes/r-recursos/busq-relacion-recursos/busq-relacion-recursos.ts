import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { RecursoService } from '../../../../../core/services/recurso-service';
import { RecursoRelacionDTO } from '../../../../../models/RecursoRelacionDTO';

@Component({
  selector: 'app-busq-relacion-recursos',
  standalone: true,
  imports: [CommonModule, FormsModule, MatInputModule, MatButtonModule, MatIconModule, MatCardModule],
  templateUrl: './busq-relacion-recursos.html',
  styleUrl: './busq-relacion-recursos.css'
})
export class BusqRelacionRecursos {
  creadorId: number | null = null;
  destinatarioId: number | null = null;
  
  resultado: RecursoRelacionDTO | null = null;
  buscado: boolean = false;

  constructor(private rService: RecursoService) {}

  buscar() {
    if (this.creadorId && this.destinatarioId) {
      this.rService.verificarRelacion(this.creadorId, this.destinatarioId).subscribe({
        next: (data) => {
          this.resultado = data;
          this.buscado = true;
        },
        error: (err) => {
          console.error(err);
          this.buscado = false;
        }
      });
    }
  }
}