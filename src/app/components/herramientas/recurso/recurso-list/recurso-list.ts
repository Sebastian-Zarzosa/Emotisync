import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card'; // <-- AÑADIR ESTA LÍNEA

import { Recurso } from '../../../../models/recurso';
import { RecursoService } from '../../../../core/services/recurso-service';

@Component({
  selector: 'app-recurso-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule, // <-- AÑADIR ESTA LÍNEA
  ],
  templateUrl: './recurso-list.html',
  styleUrls: ['./recurso-list.css'], // Asegúrate de que este archivo exista
})
export class RecursoList implements OnInit, AfterViewInit {
  // ... (el resto de tu archivo .ts puede quedar exactamente igual) ...
  dataSource = new MatTableDataSource<Recurso>([]);
  displayedColumns: string[] = [
    'titulo',
    'tipo',
    'enlace',
    'fechaCr',
    'creador',
    'destinatario',
    'esPublico',
    'editar',
    'eliminar',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private rS: RecursoService) {}

  ngOnInit(): void {
    this.load();
    this.rS.getList().subscribe((data) => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  load() {
    this.rS.list().subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  eliminar(id: number): void {
    if (confirm('¿Estás seguro de eliminar este recurso?')) {
      this.rS.delete(id).subscribe(() => {
        this.load();
      });
    }
  }
}