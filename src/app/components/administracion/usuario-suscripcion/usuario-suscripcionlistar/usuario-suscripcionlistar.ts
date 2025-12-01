import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { usuarioSuscripcion } from '../../../../models/usuario_suscripcion';
import { UsuarioSuscripcionService } from '../../../../core/services/usuario_suscripcionservice';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-usuario-suscripcionlistar',
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    RouterLink,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './usuario-suscripcionlistar.html',
  styleUrl: './usuario-suscripcionlistar.css',
})
export class UsuarioSuscripcionlistar implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<usuarioSuscripcion> = new MatTableDataSource();

  displayedColumns: string[] = [
    'usuario',
    'plan',
    'estado',
    'fechaInicio',
    'fechaFin',
    'editar',
    'eliminar',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private uS: UsuarioSuscripcionService) {}

  ngOnInit(): void {
    this.uS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.uS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  eliminar(id: number) {
    this.uS.delete(id).subscribe(() => {
      this.uS.list().subscribe((data) => {
        this.uS.setList(data);
      });
    });
  }
}
