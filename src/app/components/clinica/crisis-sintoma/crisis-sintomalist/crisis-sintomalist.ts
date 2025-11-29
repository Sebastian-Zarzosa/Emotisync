import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common'; // Importante para pipes como date

import { CrisisSintoma } from '../../../../models/CrisisSintoma';
import { CrisisSintomaService } from '../../../../core/services/crisis-sintomaservice';

@Component({
  selector: 'app-crisis-sintoma-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    MatCardModule,
    MatPaginatorModule
  ],
  templateUrl: './crisis-sintomalist.html',
  styleUrl: './crisis-sintomalist.css'
})
export class CrisisSintomaList implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<CrisisSintoma> = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'crisis', 'sintoma', 'sever', 'observacion', 'acciones'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private csService: CrisisSintomaService) {}

  ngOnInit(): void {
    this.csService.list().subscribe((data) => {
      this.dataSource.data = data;
    });
    this.csService.getList().subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  eliminar(id: number) {
    if (confirm('¿Estás seguro de eliminar este registro?')) {
        this.csService.delete(id).subscribe(() => {
        this.csService.list().subscribe((data) => {
            this.csService.setList(data);
        });
        });
    }
  }
}