import { Component } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Alerta } from '../../../models/alertas';
import { AlertasService } from '../../../services/alertasservice';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatCardModule } from "@angular/material/card";
import { MatPaginatorModule } from "@angular/material/paginator";

@Component({
  selector: 'app-alertas-listar',
  imports: [
    MatTableModule,
    CommonModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    MatCardModule,
    MatPaginatorModule
],
  templateUrl: './alertas-listar.html',
  styleUrl: './alertas-listar.css',
})
export class AlertasListar {
  dataSource: MatTableDataSource<Alerta> = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'tipoAlerta', 'mensaje', 'nivelAlerta', 'editar', 'eliminar'];

  constructor(private aS: AlertasService) { }

  ngOnInit(): void {
    this.aS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    })

    this.aS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    })
  }

  eliminar(id: number) {
    this.aS.delete(id).subscribe(() => {
      this.aS.list().subscribe((data) => {
        this.aS.setList(data);
      });
    });
  }
}
