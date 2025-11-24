import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Usuario } from '../../../models/Usuario';
import { UsuarioService } from '../../../services/usuarioservice';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from "@angular/material/card";
import { CommonModule } from '@angular/common';

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
    CommonModule
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

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.usuarioService.listar().subscribe((data) => {
      this.dataSource.data = data;
    });

    this.usuarioService.getLista().subscribe((data) => {
      this.dataSource.data = data;
    });
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
}
