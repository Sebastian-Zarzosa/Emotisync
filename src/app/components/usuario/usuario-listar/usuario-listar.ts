import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Usuario } from '../../../models/Usuario';
import { Usuarioservice } from '../../../services/usuarioservice';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Menu } from '../../menu/menu';

@Component({
  selector: 'app-usuario-listar',
  imports: [MatTableModule, MatButtonModule, MatIconModule, RouterLink, Menu],
  templateUrl: './usuario-listar.html',
  styleUrl: './usuario-listar.css',
})
export class UsuarioListar implements OnInit {
  dataSource: MatTableDataSource<Usuario> = new MatTableDataSource();
  displayedColumns: string[] = [
    'nombre',
    'apellido',
    'email',
    'telefono',
    'fechaNacimiento',
    'editar',
    'eliminar',
  ];

  constructor(private usuarioService: Usuarioservice) {}

  ngOnInit(): void {
    this.usuarioService.listar().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });

    this.usuarioService.getLista().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  eliminar(id: number) {
    this.usuarioService.delete(id).subscribe(() => {
      this.usuarioService.listar().subscribe((data) => {
        this.usuarioService.setLista(data);
      });
    });
  }
}
