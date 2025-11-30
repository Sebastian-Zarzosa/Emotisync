import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { Sintomaservice } from '../../../../../core/services/sintomaservice';
import { Sintoma } from '../../../../../models/sintoma';

@Component({
  selector: 'app-busq-sintomas',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatCardModule
  ],
  templateUrl: './busq-sintomas.html',
  styleUrl: './busq-sintomas.css'
})
export class BusqSintomas {
  termino: string = "";
  criterio: string = "nombre"; // Valor por defecto
  
  dataSource = new MatTableDataSource<Sintoma>();
  displayedColumns: string[] = ['id', 'nombre', 'descripcion'];
  
  hasData = false;
  mensaje = "";

  constructor(private sService: Sintomaservice) {}

  buscar() {
    if (!this.termino) return;

    this.hasData = false;
    this.mensaje = "";
    this.dataSource.data = [];

    if (this.criterio === 'nombre') {
      this.sService.buscarPorNombre(this.termino).subscribe({
        next: (data) => this.procesarResultados(data),
        error: (e) => this.manejarError(e)
      });
    } else {
      this.sService.buscarPorDescripcion(this.termino).subscribe({
        next: (data) => this.procesarResultados(data),
        error: (e) => this.manejarError(e)
      });
    }
  }

  procesarResultados(data: Sintoma[]) {
    if (data.length > 0) {
      this.dataSource.data = data;
      this.hasData = true;
    } else {
      this.mensaje = "No se encontraron síntomas con ese criterio.";
    }
  }

  manejarError(err: any) {
    console.error(err);
    this.mensaje = "Ocurrió un error o no se encontraron resultados.";
  }
}