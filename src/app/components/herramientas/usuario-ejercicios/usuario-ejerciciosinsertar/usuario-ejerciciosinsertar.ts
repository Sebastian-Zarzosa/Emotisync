import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule,FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { usuarioEjercicio } from '../../../../models/usuario-ejercicio';

import { UsuarioEjerciciosService } from '../../../../core/services/usuario-ejerciciosservice';
import { ActivatedRoute, Router } from '@angular/router';
import { C } from '@angular/cdk/keycodes';
import { UsuarioService } from '../../../../core/services/usuarioservice';
import { Ejerciciosservice } from '../../../../core/services/ejerciciosservice';
import { Ejercicio } from '../../../../models/ejercicio';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { Usuario } from '../../../../models/Usuario';

@Component({
  selector: 'app-usuario-ejerciciosinsertar',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule
],
  providers: [provideNativeDateAdapter()],
  templateUrl: './usuario-ejerciciosinsertar.html',
  styleUrl: './usuario-ejerciciosinsertar.css',
})
export class UsuarioEjerciciosinsertar implements OnInit{
form: FormGroup = new FormGroup({});  
ejericio: usuarioEjercicio = new usuarioEjercicio();

edicion: boolean = false;
id: number = 0;
listaUsuarios: Usuario[] = [];
ListaEjercicios: Ejercicio[] = [];

  constructor( 
    private uE: UsuarioEjerciciosService,
    private uS: UsuarioService,
    private eS: Ejerciciosservice,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) { }

    ngOnInit(): void{
      this.form = this.formBuilder.group({
      idUsuarioEjercicio: [''],
      usuario: ['', Validators.required],
      ejercicio: ['', Validators.required],
      fechaRealizacion: ['', Validators.required],
      resultado: ['', [Validators.required, Validators.maxLength(250)]]
    })
    this.route.params.subscribe((data) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    })

    this.uS.listar().subscribe(data => {
      this.listaUsuarios = data;
    })

    this.eS.list().subscribe(data => {
      this.ListaEjercicios = data;
    })  
    ;
}

aceptar(): void {
  if(this.form.valid){
    let ejercicioParaEnviar = {
      idUsuarioEjercicio: this.form.value.idUsuarioEjercicio,
      usuario: {idUsuario: this.form.value.usuario},
      ejercicio: {idEjercicio: this.form.value.ejercicio},
      fechaRealizacion: this.form.value.fechaRealizacion,
      resultado: this.form.value.resultado,
    };
    if(this.edicion){
      //@ts-ignore
      this.uE.update(ejercicioParaEnviar).subscribe({
        next: () => {
          this.uE.list().subscribe(data => this.uE.setList(data));
          this.router.navigate(['/usuarioEjercicios']);
    },
    error: (err) => console.error('Error al actualizar:', err)
      });
}else{
  //@ts-ignore
  this.uE.insert(ejercicioParaEnviar).subscribe({
    next: () => {
      this.uE.list().subscribe(data => this.uE.setList(data));
      this.router.navigate(['/usuarioEjercicios']);
    },
    error: (err) => console.error('Error al insertar:', err)
  });
}
}
}

cancelar(): void{
  this.router.navigate(['usuarioEjercicios']);
}

init(){
  if(this.edicion){
    this.uE.listId(this.id).subscribe((data) => {
      this.form = new FormGroup({
        idUsuarioEjercicio: new FormControl(data.idUsuarioEjercicio),
        usuario: new FormControl(data.usuario.idUsuario),
        ejercicio: new FormControl(data.ejercicio.idEjercicio),
        fechaRealizacion: new FormControl(data.fechaRealizacion),
        resultado: new FormControl(data.resultado)
      })
    }
      )
}
}
}