// Imports de Angular
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

// Imports de Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

// Imports de Servicios
import { PlanesSuscripcionService } from '../../../../core/services/planes_suscripcionservice';
import { UsuarioService } from '../../../../core/services/usuarioservice';
import { UsuarioSuscripcionService } from '../../../../core/services/usuario_suscripcionservice';

// Imports de Modelos
import { planesSuscripcion } from '../../../../models/planes_suscripcion';
import { Usuario } from '../../../../models/Usuario';
import { usuarioSuscripcion } from '../../../../models/usuario_suscripcion';

import Swal from 'sweetalert2';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from "@angular/material/list";
import { LoginService } from '../../../../core/services/login';

@Component({
  selector: 'app-usuario-suscripcioninsertar',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatIconModule,
    MatListModule
],
  templateUrl: './usuario-suscripcioninsertar.html',
  styleUrl: './usuario-suscripcioninsertar.css',
})
export class UsuarioSuscripcioninsertar implements OnInit{
  form: FormGroup = new FormGroup({});
  listaPlanes: planesSuscripcion[] = [];

  esAdmin: boolean = false
  constructor(
    private usS: UsuarioSuscripcionService,
    private uS: UsuarioService,
    private pS: PlanesSuscripcionService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private loginService: LoginService
  ) { }
  
  ngOnInit(): void {
    this.esAdmin = this.loginService.isAdmin();
    this.form = this.formBuilder.group({
      idUsuarioSuscripcion: [0],
      planesSuscripcion: ['', Validators.required],
      // Validaciones de tarjeta (Visuales)
      nombreTarjeta: ['', [Validators.required, Validators.minLength(3)]],
      numeroTarjeta: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]],
      fechaExp: ['', [Validators.required, Validators.pattern('^(0[1-9]|1[0-2])\\/?([0-9]{2})$')]],
      cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3}$')]]
    });

    // Cargar planes
    this.pS.list().subscribe(data => this.listaPlanes = data);

    this.route.queryParams.subscribe(params => {
      const planId = params['planId'];
      if (planId) {
        // PatchValue llena el campo automáticamente
        this.form.patchValue({
          planesSuscripcion: Number(planId)
        });
      }
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      // 1. Preparar objeto para el Backend
      // Solo enviamos el ID del plan. Las fechas y el usuario los pone el backend.
      const suscripcionParaEnviar = {
        idUsuarioSuscripcion: 0,
        planesSuscripcion: { 
          idPlanesSuscripcion: this.form.value.planesSuscripcion 
        },
        // Campos nulos explícitos para que Java no se queje
        usuario: null,
        fechaInicio: null,
        fechaFin: null,
        estado: null
      };

      // 2. Enviar
      // @ts-ignore
      this.usS.insert(suscripcionParaEnviar).subscribe({
        next: (data: any) => {
          // Éxito: data ahora es un objeto { mensaje: "..." }
          Swal.fire({
            icon: 'success',
            title: '¡Suscripción Activa!',
            text: data.mensaje || 'Tu plan ha sido activado correctamente.',
            confirmButtonColor: '#3085d6'
          }).then(() => {
             this.router.navigate(['/dashboard']); // O a donde prefieras
          });
        },
        error: (err) => {
          console.error(err);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo procesar el pago.',
            confirmButtonColor: '#d33'
          });
        }
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/dashboard']); // O volver atrás
  }
}
