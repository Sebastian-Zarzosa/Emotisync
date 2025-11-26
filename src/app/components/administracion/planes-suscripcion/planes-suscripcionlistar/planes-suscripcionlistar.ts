import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterOutlet } from '@angular/router';
import { PlanesSuscripcionService } from '../../../../core/services/planes_suscripcionservice';
import { planesSuscripcion } from '../../../../models/planes_suscripcion';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from "@angular/material/card";
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
@Component({
  selector: 'app-planes-suscripcionlistar',
  imports: [MatTableModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    MatPaginatorModule, MatCardModule,
  AsyncPipe
  ],
  templateUrl: './planes-suscripcionlistar.html',
  styleUrl: './planes-suscripcionlistar.css',
})
export class PlanesSuscripcionlistar implements OnInit, AfterViewInit{
  dataSource: MatTableDataSource<planesSuscripcion> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  obs!: Observable<any>;

  constructor(private pS: PlanesSuscripcionService) { }

  ngOnInit(): void {
    this.cargarDatos();
    this.pS.getList().subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  cargarDatos() {
    this.pS.list().subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.obs = this.dataSource.connect();
  }

  ngOnDestroy() {
    if (this.dataSource) { 
      this.dataSource.disconnect(); 
    }
  }

  eliminar(id: number) {
    this.pS.delete(id).subscribe(() => {
      this.cargarDatos();
    });
  }
}