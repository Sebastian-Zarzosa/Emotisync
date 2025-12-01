import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { HistorialSuscripcionesPorUsuarioDTO } from '../../../../../models/HistorialSuscripcionesPorUsuarioDTO';
import { UsuarioSuscripcionService } from '../../../../../core/services/usuario_suscripcionservice';

@Component({
  selector: 'app-busq-historial-email',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ],
  templateUrl: './busq-historial-email.html',
  styleUrl: './busq-historial-email.css'
})
export class BusqHistorialEmail {
  emailBusqueda: string = "";
  
  dataSource = new MatTableDataSource<HistorialSuscripcionesPorUsuarioDTO>();
  displayedColumns: string[] = ['nombrePlan', 'precio', 'estado'];
  
  hasData = false;
  mensaje = "";

  constructor(private usService: UsuarioSuscripcionService) {}

  buscar() {
    if (!this.emailBusqueda || !this.emailBusqueda.includes('@')) {
        this.mensaje = "Ingresa un email válido.";
        this.hasData = false;
        return;
    }

    this.hasData = false;
    this.mensaje = "";
    this.dataSource.data = [];

    this.usService.buscarPorEmail(this.emailBusqueda).subscribe({
        next: (data) => {
            if (data && data.length > 0) {
                this.dataSource.data = data;
                this.hasData = true;
            } else {
                this.mensaje = `No se encontró historial para el email: ${this.emailBusqueda}.`;
            }
        },
        error: (e) => {
            console.error(e);
            this.mensaje = "Ocurrió un error (404) o el usuario no existe.";
        }
    });
  }
}