import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../../core/services/login';
import { UsuarioService } from '../../../core/services/usuarioservice';
import { Usuario } from '../../../models/Usuario';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog'; // Importar Dialog
import { PerfilEditComponent } from './perfil-edit/perfil-edit'; // Importar el componente creado

import Swal from 'sweetalert2';
@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
  ],
  templateUrl: './perfil.html',
  styleUrls: ['./perfil.css'],
})
export class PerfilComponent implements OnInit {
  usuario: Usuario = new Usuario();
  rolActual: string = '';

  constructor(
    private loginService: LoginService,
    private usuarioService: UsuarioService,
    private dialog: MatDialog // Inyectar Dialog
  ) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos() {
    const username = this.loginService.getUsername();
    this.rolActual = this.loginService.getRole();

    this.usuarioService.listar().subscribe((users) => {
      const found = users.find(
        (u) => u.username === username || u.email === username
      );
      if (found) {
        this.usuario = found;
      }
    });
  }

  cambiarRol(nuevoRol: string) {
    if (this.rolActual === nuevoRol) return; // Ya tiene ese rol

    Swal.fire({
      title: '¿Cambiar tipo de cuenta?',
      text: `Estás a punto de cambiar tu perfil a ${nuevoRol}.`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, cambiar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.rolActual = nuevoRol;
        Swal.fire(
          '¡Listo!',
          'Tu perfil ha sido actualizado. Por favor inicia sesión nuevamente.',
          'success'
        );
      }
    });
  }

  solicitarCambio(nuevoRol: string) {
    if (this.rolActual === nuevoRol) return;

    // LÓGICA PARA ESPECIALISTA
    if (nuevoRol === 'ESPECIALISTA') {
      Swal.fire({
        title: 'Solicitud de Especialista',
        text: 'Para validar tu cuenta como especialista, necesitamos tu Número de Colegiatura (CMP/CPP).',
        input: 'text',
        inputPlaceholder: 'Ingresa tu Nro. de Colegiatura',
        showCancelButton: true,
        confirmButtonText: 'Enviar Solicitud',
        cancelButtonText: 'Cancelar',
        inputValidator: (value) => {
          if (!value) return '¡Necesitas escribir tu colegiatura!';
          if (!/^\d+$/.test(value)) return 'Solo se permiten números';
          return null;
        },
      }).then((result) => {
        if (result.isConfirmed) {
        }
      });
    }

    // LÓGICA PARA FAMILIAR
    else if (nuevoRol === 'FAMILIAR') {
      Swal.fire({
        title: 'Cuenta de Familiar',
        text: 'Ingresa el correo electrónico del paciente al que deseas supervisar.',
        input: 'email',
        inputPlaceholder: 'paciente@ejemplo.com',
        showCancelButton: true,
        confirmButtonText: 'Vincular',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
        }
      });
    }
  }

  abrirEdicion() {
    const dialogRef = this.dialog.open(PerfilEditComponent, {
      data: this.usuario, // Pasamos el usuario actual
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.cargarDatos(); // Si se guardó, recargamos los datos
      }
    });
  }

  // Helpers visuales
  esPaciente(): boolean {
    return this.rolActual === 'PACIENTE';
  }
  esEspecialista(): boolean {
    return this.rolActual === 'ESPECIALISTA';
  }
  esFamiliar(): boolean {
    return this.rolActual === 'FAMILIAR';
  }
  esSinRegistrar(): boolean {
    return (
      !this.esPaciente() && !this.esEspecialista() && this.rolActual !== 'ADMIN'
    );
  }
}
