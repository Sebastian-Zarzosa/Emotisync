import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Diario } from '../../../models/Diario';
import { Diarioservice } from '../../../services/diarioservice';
import { Menu } from '../../menu/menu';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardTitle, MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-diario-listar',
  imports: [
    Menu,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    MatCardModule,
  ],
  templateUrl: './diario-listar.html',
  styleUrl: './diario-listar.css',
})
export class DiarioListar implements OnInit {
  dataSource: MatTableDataSource<Diario> = new MatTableDataSource();
  displayedColumns: string[] = [
    'fecha',
    'titulo',
    'contenido',
    'emociones',
    'usuario',
    'editar',
    'eliminar',
  ];

  constructor(private diarioService: Diarioservice) {}

  ngOnInit(): void {
    this.diarioService.listar().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });

    this.diarioService.getLista().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  eliminar(id: number) {
    this.diarioService.eliminar(id).subscribe(() => {
      this.diarioService.listar().subscribe((data) => {
        this.diarioService.setLista(data);
      });
    });
  }
}
