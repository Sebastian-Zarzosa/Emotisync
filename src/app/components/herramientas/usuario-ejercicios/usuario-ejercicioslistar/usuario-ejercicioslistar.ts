import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { usuarioEjercicio } from '../../../../models/usuario-ejercicio';
import { UsuarioEjerciciosService } from '../../../../core/services/usuario-ejerciciosservice';

@Component({
  selector: 'app-usuario-ejercicioslistar',
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    RouterLink,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './usuario-ejercicioslistar.html',
  styleUrl: './usuario-ejercicioslistar.css',
})
export class UsuarioEjercicioslistar implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<usuarioEjercicio> = new MatTableDataSource();
  displayedColumns: string[] = [
    'ejercicio',
    'fechaRealizacion',
    'resultado',
    'editar',
    'eliminar',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private uE: UsuarioEjerciciosService) {}

  ngOnInit(): void {
    this.uE.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.uE.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  eliminar(id: number) {
    this.uE.delete(id).subscribe(() => {
      this.uE.list().subscribe((data) => {
        this.uE.setList(data);
      });
    });
  }
}
