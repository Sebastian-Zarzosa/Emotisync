import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UsuarioSuscripcionService } from '../../../../../core/services/usuario_suscripcionservice';
import { SuscripcionesActivasInfoUsuarioDTO } from '../../../../../models/SuscripcionesActivasInfoUsuarioDTO';
import { MatCard, MatCardTitle, MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'app-rep-suscripciones-activas',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCard, MatCardTitle, MatCardModule, MatIconModule],
  templateUrl: './rep-suscripciones-activas.html',
  styleUrl: './rep-suscripciones-activas.css'
})
export class RepSuscripcionesActivas implements OnInit {
  dataSource = new MatTableDataSource<SuscripcionesActivasInfoUsuarioDTO>();
  displayedColumns: string[] = ['usuario', 'email', 'plan', 'precio'];

  constructor(private uS: UsuarioSuscripcionService) {}

  ngOnInit(): void {
    this.uS.buscarActivos().subscribe(data => {
      this.dataSource.data = data;
    });
  }
}