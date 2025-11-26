import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../../core/services/login';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';

import Swal from 'sweetalert2';
import { JwtHelperService } from '@auth0/angular-jwt';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  form: FormGroup
  hidePassword = true

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService
  ) {
    this.form = this.fb.group({
      email: ['', [
        Validators.required, Validators.email
      ]],
      password: ['', Validators.required]
    })
  }

  ingresar() {
    if (this.form.valid) {
      const req = {
        username: this.form.value.email,
        password: this.form.value.password
      }

      Swal.fire({
        title: 'Iniciando Sesion...',
        text: 'Por favor, espere',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading()
        }
      })
      this.loginService.login(req).subscribe({
        next: (data: any) => {
          Swal.close()

          sessionStorage.setItem('token', data.jwttoken)

          Swal.fire({
            icon: 'success',
            title: 'Bienvenido',
            text: 'Has iniciado sesion correctamente',
            timer: 1800,
            showConfirmButton: false
          }).then(() => {
            this.router.navigate(['/dashboard'])
          })
        },
        error: (err) => {
          console.log('Error:', err);
          //Alerta de Error
          Swal.fire({
            icon: 'error',
            title: 'Acceso denegado',
            text: 'Email o contraseña incorrectos. Por favor verifica',
            confirmButtonColor: '#d33',
            confirmButtonText: 'Intentar de nuevo'
          })
        }
      })
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Formulario incompleto',
        text: 'Por favor completa todos los campos requeridos',
        confirmButtonColor: '#3085d6'
      })
    }
  }

  cerrarSesion(){
    sessionStorage.clear()
  }
}
