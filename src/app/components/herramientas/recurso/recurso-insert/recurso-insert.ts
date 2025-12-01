import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Recurso } from '../../../../models/recurso';
import { RecursoService } from '../../../../core/services/recurso-service';
import { UsuarioService } from '../../../../core/services/usuarioservice';
import { Usuario } from '../../../../models/Usuario';

@Component({
  selector: 'app-recurso-insert',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [FormBuilder],
  templateUrl: './recurso-insert.html',
  styleUrls: ['./recurso-insert.css'],
})

export class RecursoInsert implements OnInit {
  form: FormGroup = new FormGroup({});
  recurso: Recurso = new Recurso();
  listaUsuarios: Usuario[] = [];
  edicion: boolean = false;
  id: number = 0;
  today = new Date();

  constructor(
    private rS: RecursoService,
    private uS: UsuarioService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.uS.listar().subscribe((data) => {
      this.listaUsuarios = data;
    });

    this.form = this.formBuilder.group({
      id: [''],
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      enlace: ['', Validators.required],
      tipo: ['', Validators.required],
      fechaCr: ['', Validators.required],
      pruebaf1: ['', Validators.required],
      pruebaf2: ['', Validators.required],
      esPublico: ['', Validators.required],
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.recurso.id = this.form.value.id;
      this.recurso.titulo = this.form.value.titulo;
      this.recurso.descripcion = this.form.value.descripcion;
      this.recurso.enlace = this.form.value.enlace;
      this.recurso.tipo = this.form.value.tipo;
      this.recurso.fechaCr = this.form.value.fechaCr;
      this.recurso.creador.idUsuario = this.form.value.pruebaf1;
      this.recurso.destinatario.idUsuario = this.form.value.pruebaf2;
      this.recurso.esPublico = this.form.value.esPublico;

      if (this.edicion) {
        this.rS.update(this.recurso).subscribe(() => {
          this.rS.list().subscribe((data) => this.rS.setList(data));
        });
      } else {
        this.rS.insert(this.recurso).subscribe(() => {
          this.rS.list().subscribe((data) => this.rS.setList(data));
        });
      }
      this.router.navigate(['recursos']);
    }
  }

  init() {
    if (this.edicion) {
      this.rS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          id: new FormControl(data.id),
          titulo: new FormControl(data.titulo),
          descripcion: new FormControl(data.descripcion),
          enlace: new FormControl(data.enlace),
          tipo: new FormControl(data.tipo),
          fechaCr: new FormControl(data.fechaCr),
          pruebaf1: new FormControl(data.creador.idUsuario),
          pruebaf2: new FormControl(data.destinatario.idUsuario),
          esPublico: new FormControl(data.esPublico),
        });
      });
    }
  }
}
