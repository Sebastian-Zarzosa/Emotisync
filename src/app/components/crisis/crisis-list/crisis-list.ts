import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Crisis } from '../../../models/Crisis';
import { CrisisService } from '../../../services/crisisservice';


@Component({
  selector: 'app-crisis-list',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule, RouterLink, MatCardModule, MatPaginatorModule],
  templateUrl: './crisis-list.html',
  styleUrl: './crisis-list.css',
})
export class CrisisList implements OnInit{
  dataSource: MatTableDataSource<Crisis> = new MatTableDataSource();
  displayedColumns: string[] = ['idCrisis', 'fecha', 'tiempoRespuesta', 'ritmo', 'articulacion', 'f0_promedio', 'formantesDetectados', 'usuario', 'edit', 'delete' ];
  constructor(private criService: CrisisService) {}
  cantidadRegistros: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    this.criService.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.cantidadRegistros = data.length; // waaa
      this.dataSource.paginator = this.paginator; // waaa
    });
    this.criService.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.cantidadRegistros = data.length; // waaa
      this.dataSource.paginator = this.paginator; //waaa
    });
  }

  eliminar(id: number) {
    this.criService.delete(id).subscribe((data) => {
      this.criService.list().subscribe((data) => {
        this.criService.setList(data);
      });
    });
  }
}
