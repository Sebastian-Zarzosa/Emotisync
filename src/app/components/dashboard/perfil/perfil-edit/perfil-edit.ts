import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { Usuario } from '../../../../models/Usuario';
import { UsuarioService } from '../../../../core/services/usuarioservice';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil-edit',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    MatDialogModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule
  ],
  template: `
    <h2 mat-dialog-title>Editar Perfil</h2>
    <mat-dialog-content>
      <form [formGroup]="form">
        <div style="display: flex; gap: 10px;">
            <mat-form-field appearance="outline" style="width: 100%;">
            <mat-label>Nombre</mat-label>
            <input matInput formControlName="nombre">
            </mat-form-field>

            <mat-form-field appearance="outline" style="width: 100%;">
            <mat-label>Apellido</mat-label>
            <input matInput formControlName="apellido">
            </mat-form-field>
        </div>

        <mat-form-field appearance="outline" style="width: 100%;">
          <mat-label>Teléfono</mat-label>
          <input matInput formControlName="telefono">
        </mat-form-field>

        <mat-form-field appearance="outline" style="width: 100%;">
          <mat-label>Email (Usuario)</mat-label>
          <input matInput formControlName="email" readonly style="color: gray;">
          <mat-hint>El email no se puede cambiar</mat-hint>
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancelar</button>
      <button mat-raised-button color="primary" (click)="guardar()" [disabled]="form.invalid">Guardar</button>
    </mat-dialog-actions>
  `
})
export class PerfilEditComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    public dialogRef: MatDialogRef<PerfilEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Usuario
  ) {
    this.form = this.fb.group({
      nombre: [data.nombre, Validators.required],
      apellido: [data.apellido, Validators.required],
      telefono: [data.telefono, Validators.required],
      email: [data.email] // Solo lectura
    });
  }

  ngOnInit(): void {}

  guardar() {
    if (this.form.valid) {
      // Copiamos los datos del formulario al objeto original
      const usuarioActualizado = { ...this.data, ...this.form.value };

      this.usuarioService.update(usuarioActualizado).subscribe({
        next: () => {
          Swal.fire('Actualizado', 'Tus datos han sido guardados', 'success');
          this.dialogRef.close(true); // Retorna true para avisar que recargue
        },
        error: (e) => {
          console.error(e);
          Swal.fire('Error', 'No se pudo actualizar el perfil', 'error');
        }
      });
    }
  }
}