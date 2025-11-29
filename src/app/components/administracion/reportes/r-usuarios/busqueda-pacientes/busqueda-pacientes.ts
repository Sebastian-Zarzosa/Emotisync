import { Component } from '@angular/core';
import { UsuarioService } from '../../../../../core/services/usuarioservice';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Usuario } from '../../../../../models/Usuario';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-busqueda-pacientes',
  imports: [
    MatTableModule,
    ReactiveFormsModule,
    CommonModule,
    MatLabel,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './busqueda-pacientes.html',
  styleUrl: './busqueda-pacientes.css',
})
export class BusquedaPacientes {
  dataSource: MatTableDataSource<Usuario> = new MatTableDataSource();

  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7'];
  nombrebusqueda: string = '';
  mensaje: string = '';
  form: FormGroup;

  Results: boolean = false;

  constructor(private usuarioService: UsuarioService, private fb: FormBuilder) {
    this.form = this.fb.group({
      nombrebusqueda: [''],
    });
  }
  ngOnInit(): void {
    this.usuarioService.listar().subscribe((data) => {
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
      this.usuarioService.listar().subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
      });
      return;
    }

    this.usuarioService.searchPatientsOfEspecialist(termino).subscribe(
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
