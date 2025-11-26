import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Alerta } from '../../../../models/alertas';
import { AlertasService } from '../../../../core/services/alertasservice';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UsuarioService } from '../../../../core/services/usuarioservice';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Usuario } from '../../../../models/Usuario';

@Component({
  selector: 'app-alertas-insertar',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule
  ],
  templateUrl: './alertas-insertar.html',
  styleUrl: './alertas-insertar.css',
})
export class AlertasInsertar implements OnInit{
  form: FormGroup = new FormGroup({});
  alert: Alerta = new Alerta();
  edicion: boolean = false;

  id: number = 0;
  listaUsuarios: Usuario[] = [];

  constructor(
    private aS: AlertasService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private uS: UsuarioService
  ) { }
  
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      codigo: [''],
      alerta: ['', Validators.required],
      mensaje: ['', Validators.required],
      nivel: ['', Validators.required],
      usuario: ['', Validators.required]
    })

    this.route.params.subscribe((data: Params) => {
      this.id = data['id']
      this.edicion = data['id'] != null
      this.init()
    })
    
    //Cargar los dropdowns
    this.uS.listar().subscribe(data => {
      this.listaUsuarios = data;
    })
  }

  aceptar(): void {
    if (this.form.valid) {
      this.alert.idAlerta = this.form.value.codigo
      this.alert.tipo_alerta = this.form.value.alerta
      this.alert.mensaje = this.form.value.mensaje
      this.alert.nivel_alerta = this.form.value.nivel
      this.alert.usuario.idUsuario = this.form.value.usuario

      if (this.edicion) {
        this.aS.update(this.alert).subscribe(() => {
          this.aS.list().subscribe((data) => {
            this.aS.setList(data)
          });
        });
      } else {
        this.aS.insert(this.alert).subscribe(() => {
          this.aS.list().subscribe((data) => {
            this.aS.setList(data)
          })
        })
      }

      this.router.navigate(['/alerta'])
    }
  }

  init() {
    if (this.edicion) {
      this.aS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idAlerta),
          alerta: new FormControl(data.tipo_alerta),
          mensaje: new FormControl(data.mensaje),
          nivel: new FormControl(data.nivel_alerta),
          usuario: new FormControl(data.usuario?.idUsuario)
        })
      })
    }
  }

  cancelar() {
    this.router.navigate(['/alerta'])
  }
}
