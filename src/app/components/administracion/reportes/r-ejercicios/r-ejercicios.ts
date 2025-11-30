import { Component } from '@angular/core';
import { Ejercicio } from '../../../../models/ejercicio';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Ejerciciosservice } from '../../../../core/services/ejerciciosservice';
import { CommonModule } from '@angular/common';
import { MatInputModule, MatLabel } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-r-ejercicios',
  imports: [
    MatTableModule,
    ReactiveFormsModule,
    CommonModule,
    MatLabel,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './r-ejercicios.html',
  styleUrl: './r-ejercicios.css',
})
export class REjercicios {
  dataSource: MatTableDataSource<Ejercicio> = new MatTableDataSource();

  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4'];
  nombrebusqueda: string = '';
  mensaje: string = '';
  form: FormGroup;

  Results: boolean = false;

  constructor(
    private ejercicioService: Ejerciciosservice,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      nombrebusqueda: [''],
    });
  }
  ngOnInit(): void {
    this.ejercicioService.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.form.get('nombrebusqueda')?.valueChanges.subscribe((value) => {
      this.nombrebusqueda = value;
      this.buscar();
    });
  }

  buscar() {
    const termino = this.nombrebusqueda.trim();

    if (termino === '') {
      // Si el campo está vacío → listar todos los registros
      this.ejercicioService.list().subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
      });
      return;
    }

    this.ejercicioService.findByName(termino).subscribe(
      (data) => {
        this.dataSource = new MatTableDataSource(data);
        this.Results = data.length === 0; // si no hay resultados, mostrar mensaje
      },
      (err) => {
        if (err.status === 404) {
          this.dataSource = new MatTableDataSource(); // limpiar tabla
          this.Results = true; // activar mensaje de “no hay resultados”
        } else {
          console.error('Error inesperado:', err);
        }
      }
    );
  }
}
