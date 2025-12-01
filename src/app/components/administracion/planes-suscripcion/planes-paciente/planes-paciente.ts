import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { PlanesSuscripcionService } from '../../../../core/services/planes_suscripcionservice';
import { planesSuscripcion } from '../../../../models/planes_suscripcion';

@Component({
  selector: 'app-planes-paciente',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './planes-paciente.html',
  styleUrl: './planes-paciente.css'
})
export class PlanesPacienteComponent implements OnInit {
  listaPlanes: planesSuscripcion[] = [];

  constructor(
    private pS: PlanesSuscripcionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.pS.list().subscribe(data => {
      this.listaPlanes = data;
    });
  }

  suscribirse(idPlan: number): void {
  // Redirige al formulario de pago y le pasa el ID del plan en la URL
  this.router.navigate(['/usuario-suscripcion/insertar'], { 
    queryParams: { planId: idPlan } 
  });
  }
}