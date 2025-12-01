import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Diario } from '../../../../models/Diario';
import { Diarioservice } from '../../../../core/services/diarioservice';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../../../../models/Usuario';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { Emocionesservice } from '../../../../core/services/emocionesservice';
import { Emociones } from '../../../../models/Emociones';
import { MatCardModule } from '@angular/material/card';
import { UsuarioService } from '../../../../core/services/usuarioservice';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';
import { LoginService } from '../../../../core/services/login';
import { DiarioDTOInsert } from '../../../../models/DiarioInsert';

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
    MatButtonToggleModule,
    MatSliderModule,
    MatIconModule,
  ],
  templateUrl: './diario-insertar.html',
  styleUrl: './diario-insertar.css',
})
export class DiarioInsertar implements OnInit {
  form: FormGroup = new FormGroup({});
  diario: DiarioDTOInsert = new DiarioDTOInsert();
  edicion: boolean = false;

  listaUsuarios: Usuario[] = [];
  listaEmociones: Emociones[] = [];

  id: number = 0;
  today = new Date();
  usuarioSeleccionado: Usuario = new Usuario();
  emocionSeleccionada: Emociones = new Emociones();

  constructor(
    private diarioService: Diarioservice,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    private emocionesService: Emocionesservice,
    private loginService: LoginService
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
      tipoEmocion: ['', Validators.required],
      titulo: [
        '',
        [Validators.required, Validators.min(1), Validators.max(10)],
      ],
      notas: ['', Validators.maxLength(255)],
      fecha: [new Date()],
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      const formValue = this.form.value;

      this.diario.idDiario = formValue.id || 0;
      this.diario.fecha = formValue.fecha || new Date();

      this.diario.contenido = formValue.notas;
      this.diario.titulo = formValue.titulo;

      this.diario.emociones = formValue.tipoEmocion.idEmociones;

      this.usuarioSeleccionado = this.listaUsuarios.find(
        (u) => u.username === this.loginService.getUsername()
      ) as Usuario;
      this.diario.usuario = this.usuarioSeleccionado.idUsuario;

      if (this.edicion) {
        this.diarioService.modificar(this.diario).subscribe({
          next: () => {
            this.diarioService
              .listar()
              .subscribe((data) => this.diarioService.setLista(data));
            this.router.navigate(['diarios']);
          },
          error: (e) => console.error(e),
        });
      } else {
        console.log('Diario a insertar:', this.diario);
        this.diarioService.insertar(this.diario).subscribe({
          next: () => {
            this.diarioService
              .listar()
              .subscribe((data) => this.diarioService.setLista(data));
            this.router.navigate(['diarios']);
          },
          error: (e) => console.error('Error al guardar:', e),
        });
      }
      this.router.navigate(['diarios']);
    }
  }

  init() {
    if (this.edicion) {
      this.diarioService.listarId(this.id).subscribe((data) => {
        this.form.patchValue({
          id: data.idDiario,
          fecha: data.fecha,
          notas: data.contenido,
          titulo: data.titulo,
          tipoEmocion: data.emociones, // Usar la emoción encontrada
        });
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/diarios']);
  }

  // Función para comparar emociones por ID
  compareEmociones(e1: Emociones, e2: Emociones): boolean {
    return e1 && e2 ? e1.idEmociones === e2.idEmociones : e1 === e2;
  }
}
