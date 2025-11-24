import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../services/login';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';

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

      this.loginService.login(req).subscribe({
        next: (data) => {
          console.log('Credenciales correctas')
          sessionStorage.setItem('ingreso', 'true')

          this.router.navigate(['/usuarios'])
        },
        error: (err) => {
          console.log('Error:', err)
          alert('Usuario o contraseña incorrectos')
        }
      })
    }
  }
}
