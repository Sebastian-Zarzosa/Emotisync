import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { UsuarioService } from '../../services/usuarioservice';
import { Rol } from '../../models/Rol';
import { Usuario } from '../../models/Usuario';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatDatepickerModule
  ],
  providers:[provideNativeDateAdapter()],
  templateUrl: './registro.html',
  styleUrl: './registro.css',
})
export class Registro {
  form: FormGroup
  hidePassword = true

  rolesDisponibles = [
    { id: 2, nombre: 'Paciente' },
    { id: 3, nombre: 'Especialista' },
    {id: 4, nombre: 'Familiar'}
  ]

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private usuarioService: UsuarioService
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{3}-[0-9]{3}-[0-9]{3}$')]],
      fechaNacimiento: ['',Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rolId: [2, Validators.required]
    })
  }

  registrarse() {
    if (this.form.valid) {
      const nuevoUsuario = new Usuario();
      const data = this.form.value;

      // 1. Mapear datos personales completos
      nuevoUsuario.idUsuario = 0;
      nuevoUsuario.nombre = data.nombre;
      nuevoUsuario.apellido = data.apellido;
      nuevoUsuario.email = data.email;
      nuevoUsuario.telefono = data.telefono;
      nuevoUsuario.fechaNacimiento = data.fechaNacimiento;
      nuevoUsuario.password = data.password;
      
      // Datos técnicos obligatorios
      nuevoUsuario.username = data.email;
      nuevoUsuario.enabled = true;
      // Institución/Colegiatura son opcionales en BD, los dejamos vacíos
      nuevoUsuario.institucion = ""; 
      nuevoUsuario.nroColegiatura = 0;

      // 2. Asignar el Rol seleccionado
      const rolSeleccionado = new Rol();
      rolSeleccionado.idRol = data.rolId;
      // Buscamos el nombre del rol solo para enviarlo completo (opcional)
      const rolObj = this.rolesDisponibles.find(r => r.id === data.rolId);
      rolSeleccionado.rol = rolObj ? rolObj.nombre.toUpperCase() : 'PACIENTE';
      
      nuevoUsuario.roles = [rolSeleccionado];

      // 3. Guardar
      this.usuarioService.insertar(nuevoUsuario).subscribe({
        next: () => {
          alert("¡Registro completado! Ahora puedes iniciar sesión.");
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error("Error al registrar:", err);
          alert("Hubo un error. Verifica que el correo no esté duplicado.");
        }
      });
    }
  }

  formatearTelefono(event: any) {
    const input = event.target;
    let value = input.value.replace(/\D/g, '');
    if (value.length > 9) value = value.substring(0, 9);
    
    if (value.length > 6) {
      value = `${value.substring(0, 3)}-${value.substring(3, 6)}-${value.substring(6)}`;
    } else if (value.length > 3) {
      value = `${value.substring(0, 3)}-${value.substring(3)}`;
    }
    
    input.value = value;
    this.form.get('telefono')?.setValue(value);
  }
}
