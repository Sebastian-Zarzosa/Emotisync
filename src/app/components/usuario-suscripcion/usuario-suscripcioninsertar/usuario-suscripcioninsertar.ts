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
import { PlanesSuscripcionService } from '../../../services/planes_suscripcionservice';
import { UsuarioService } from '../../../services/usuarioservice';
import { UsuarioSuscripcionService } from '../../../services/usuario_suscripcionservice';

// Imports de Modelos
import { planesSuscripcion } from '../../../models/planes_suscripcion';
import { Usuario } from '../../../models/Usuario';
import { usuarioSuscripcion } from '../../../models/usuario_suscripcion';

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
    ReactiveFormsModule
  ],
  templateUrl: './usuario-suscripcioninsertar.html',
  styleUrl: './usuario-suscripcioninsertar.css',
})
export class UsuarioSuscripcioninsertar implements OnInit{
  form: FormGroup = new FormGroup({})
  suscripcion: usuarioSuscripcion = new usuarioSuscripcion();
  edicion: boolean = false;
  id: number = 0;

  //Listas para los dropdowns
  listaUsuarios: Usuario[] = [];
  listaPlanes: planesSuscripcion[] = [];
  estados: string[] = ['ACTIVO', 'INACTIVO', 'SUSPENDIDO'];

  constructor(
    private usS: UsuarioSuscripcionService,
    private uS: UsuarioService,
    private pS: PlanesSuscripcionService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) { }
  
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      idUsuarioSuscripcion: [''],
      usuario: ['', Validators.required],
      planesSuscripcion: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      estado: ['Activo', [Validators.required, Validators.maxLength(20)]]
    })

    this.route.params.subscribe((data) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    })

    //Cargar los dropdowns
    this.uS.listar().subscribe(data => {
      this.listaUsuarios = data;
    })

    this.pS.list().subscribe(data => {
      this.listaPlanes = data;
    })
  }

  aceptar(): void{
    if (this.form.valid) {
      let suscripcionParaEnviar = {
        idUsuarioSuscripcion: this.form.value.idUsuarioSuscripcion,
        usuario: { idUsuario: this.form.value.usuario },
        planesSuscripcion: { idPlanesSuscripcion: this.form.value.planesSuscripcion },
        fechaInicio: this.form.value.fechaInicio,
        fechaFin: this.form.value.fechaFin,
        estado: this.form.value.estado,
      };
      if (this.edicion) {
        //@ts-ignore
        this.usS.update(suscripcionParaEnviar).subscribe({
          next: () => {
            this.usS.list().subscribe(data => this.usS.setList(data));
            this.router.navigate(['/usuario-suscripcion']);
          },
          error: (err) => console.error('Error al actualizar:', err)
        });
      } else {
        //@ts-ignore
        this.usS.insert(suscripcionParaEnviar).subscribe({
          next: () => {
            this.usS.list().subscribe(data => this.usS.setList(data));
            this.router.navigate(['/usuario-suscripcion']);
          },
          error: (err) => console.error('Error al insertar:', err)
        });
      }
    }
  }

  cancelar(): void{
    this.router.navigate(['/usuario-suscripcion']);
  }

  init() {
    if (this.edicion) {
      this.usS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          idUsuarioSuscripcion: new FormControl(data.idUsuarioSuscripcion),
          usuario: new FormControl(data.usuario.idUsuario),
          planesSuscripcion: new FormControl(data.planesSuscripcion.idPlanesSuscripcion),
          fechaInicio: new FormControl(data.fechaInicio),
          fechaFin: new FormControl(data.fechaFin),
          estado: new FormControl(data.estado)
        })
      })
    }
  }
}
