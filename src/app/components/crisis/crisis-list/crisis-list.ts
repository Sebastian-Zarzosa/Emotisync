import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { Crisis } from '../../../models/crisis';
import { CrisisService } from '../../../services/crisisservice';

@Component({
  selector: 'app-crisis-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './crisis-list.html',
  styleUrls: ['./crisis-list.css'],
})
export class CrisisList implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<Crisis>([]);
  displayedColumns: string[] = [
    'idCrisis',
    'usuario', // <-- Columna de objeto
    'fecha',
    'tiempoRespuesta',
    'ritmo',
    'articulacion',
    'editar',
    'eliminar',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private cS: CrisisService) {}

  ngOnInit(): void {
    this.load();
    this.cS.getList().subscribe((data) => {
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
    this.cS.list().subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  eliminar(id: number): void {
    if (confirm('¿Estás seguro de eliminar esta crisis?')) {
      this.cS.delete(id).subscribe({
        next: () => {
          this.load(); // Recarga la lista
        },
        error: (err) => {
          console.error('Error al eliminar la crisis:', err);
          alert('Error al eliminar: Es posible que esta crisis esté siendo usada y no pueda ser borrada.');
        }
      });
    }
  }
}