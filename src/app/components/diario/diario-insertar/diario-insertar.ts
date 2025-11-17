import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { Diario } from '../../../models/Diario';
import { Diarioservice } from '../../../services/diarioservice';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuarioservice } from '../../../services/usuarioservice';
import { Usuario } from '../../../models/Usuario';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { Emocionesservice } from '../../../services/emocionesservice';
import { Emociones } from '../../../models/Emociones';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-diario-insertar',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    CommonModule,
    MatRadioModule,
    MatNativeDateModule,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './diario-insertar.html',
  styleUrl: './diario-insertar.css',
})
export class DiarioInsertar implements OnInit {
  form: FormGroup = new FormGroup({});
  diario: Diario = new Diario();
  edicion: boolean = false;

  listaUsuarios: Usuario[] = [];
  listaEmociones: Emociones[] = [];

  id: number = 0;
  today = new Date();

  constructor(
    private diarioService: Diarioservice,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private usuarioService: Usuarioservice,
    private emocionesService: Emocionesservice
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((data) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.usuarioService.listar().subscribe((data) => {
      this.listaUsuarios = data;
    });

    this.emocionesService.listar().subscribe((data) => {
      this.listaEmociones = data;
    });

    this.form = this.formBuilder.group({
      id: [],
      fecha: [''],
      titulo: [''],
      contenido: [''],
      emocionesFK: [''],
      usuarioFK: [''],
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      (this.diario.idDiario = this.form.value.id),
        (this.diario.fecha = this.form.value.fecha),
        (this.diario.titulo = this.form.value.titulo),
        (this.diario.contenido = this.form.value.contenido),
        (this.diario.emociones.idEmociones = this.form.value.emocionesFK),
        (this.diario.usuario.idUsuario = this.form.value.usuarioFK);

      if (this.edicion) {
        this.diarioService.modificar(this.diario).subscribe(() => {
          this.diarioService.listar().subscribe((data) => {
            this.diarioService.setLista(data);
          });
        });
      } else {
        this.diarioService.insertar(this.diario).subscribe(() => {
          this.diarioService.listar().subscribe((data) => {
            this.diarioService.setLista(data);
          });
        });
      }
      this.router.navigate(['diarios']);
    }
  }

  init() {
    if (this.edicion) {
      this.diarioService.listarId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          id: new FormControl(data.idDiario),
          fecha: new FormControl(data.fecha),
          titulo: new FormControl(data.titulo),
          contenido: new FormControl(data.contenido),
          emocionesFK: new FormControl(data.emociones.idEmociones),
          usuarioFK: new FormControl(data.usuario.idUsuario),
        });
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/diarios']);
  }
}
