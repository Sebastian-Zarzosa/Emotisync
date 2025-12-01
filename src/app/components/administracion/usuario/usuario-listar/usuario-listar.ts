import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Usuario } from '../../../../models/Usuario';
import { UsuarioService } from '../../../../core/services/usuarioservice';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import {
  Form,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LoginService } from '../../../../core/services/login';

@Component({
  selector: 'app-usuario-listar',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    MatPaginatorModule,
    MatCardModule,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
  ],
  templateUrl: './usuario-listar.html',
  styleUrl: './usuario-listar.css',
})
export class UsuarioListar implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<Usuario> = new MatTableDataSource();
  displayedColumns: string[] = [
    'nombre',
    'apellido',
    'email',
    'telefono',
    'fechaNacimiento',
    'roles',
    'editar',
    'eliminar',
  ];

  results: boolean = false;
  formEmail: FormGroup;
  emailBusqueda: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private usuarioService: UsuarioService, 
    private fb: FormBuilder,
    public loginService: LoginService
  ) {
    this.formEmail = fb.group({
      email: [''],
    });
  }

  ngOnInit(): void {
    if(this.loginService.isEspecialista()){
      const emailEspecialista = this.loginService.getUsername()

      this.usuarioService.searchPatientsOfEspecialist(emailEspecialista).subscribe(data => {
        this.dataSource.data = data
      })
    } else {
      this.usuarioService.listar().subscribe((data) => {
        this.dataSource.data = data
      })
    }

    this.usuarioService.listar().subscribe((data) => {
      this.dataSource.data = data;
    });

    this.usuarioService.getLista().subscribe((data) => {
      this.dataSource.data = data;
    });

    this.formEmail.get('emailBusqueda')?.valueChanges.subscribe((value) => {
      this.emailBusqueda = value;
      this.buscar();
    });

    if(!this.loginService.isAdmin()){
      this.displayedColumns = this.displayedColumns.filter(c => c !== 'roles')
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  eliminar(id: number) {
    this.usuarioService.delete(id).subscribe(() => {
      this.usuarioService.listar().subscribe((data) => {
        this.usuarioService.setLista(data);
      });
    });
  }
  buscar() {
    const termino = this.emailBusqueda.trim();
    this.usuarioService.searchPatientsOfEspecialist(termino).subscribe(
      (data) => {
        this.dataSource = new MatTableDataSource(data);
        this.results = data.length === 0; // si no hay resultados, mostrar mensaje
      },
      (err) => {
        if (err.status === 404) {
          this.dataSource = new MatTableDataSource(); // limpiar tabla
          this.results = true; // activar mensaje de “no hay resultados”
        } else {
          console.error('Error inesperado:', err);
        }
      }
    );
  }
}
