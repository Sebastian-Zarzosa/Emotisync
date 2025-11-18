import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Crisis } from '../../../models/crisis';
import { CrisisService } from '../../../services/crisisservice';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select'; // <-- Importar
import { Usuario } from '../../../models/Usuario'; // <-- Importar
import { UsuarioService } from '../../../services/usuarioservice'; // <-- Importar

@Component({
  selector: 'app-crisis-insert',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule, // <-- Añadir
  ],
  templateUrl: './crisis-insert.html',
  styleUrls: ['./crisis-insert.css'],
})
export class CrisisInsert implements OnInit {
  form: FormGroup = new FormGroup({});
  crisis: Crisis = new Crisis();
  edicion: boolean = false;
  id: number = 0;

  // Lista para el dropdown de usuarios
  listaUsuarios: Usuario[] = [];

  constructor(
    private cS: CrisisService,
    private uS: UsuarioService, // <-- Inyectar
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Definir el formulario
    this.form = this.formBuilder.group({
      idCrisis: [''],
      usuario: ['', Validators.required], // <-- Este será el ID del dropdown
      fecha: ['', Validators.required],
      tiempoRespuesta: ['', [Validators.required, Validators.pattern(/^[0-9]*\.?[0-9]+$/)]],
      ritmo: ['', [Validators.required, Validators.pattern(/^[0-9]*\.?[0-9]+$/)]],
      articulacion: ['', [Validators.required, Validators.pattern(/^[0-9]*\.?[0-9]+$/)]],
      f0_promedio: ['', [Validators.required, Validators.pattern(/^[0-9]*\.?[0-9]+$/)]],
      formantesDetectados: ['', Validators.required],
    });

    // Cargar la lista de usuarios para el dropdown
    this.uS.listar().subscribe((data) => {
      this.listaUsuarios = data;
    });

    // Cargar datos si estamos en modo edición
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.crisis.idCrisis = this.form.value.idCrisis;
      this.crisis.fecha = this.form.value.fecha;
      this.crisis.tiempoRespuesta = this.form.value.tiempoRespuesta;
      this.crisis.ritmo = this.form.value.ritmo;
      this.crisis.articulacion = this.form.value.articulacion;
      this.crisis.f0_promedio = this.form.value.f0_promedio;
      this.crisis.formantesDetectados = this.form.value.formantesDetectados;
      
      // Asignar el objeto anidado (igual que en Recurso)
      this.crisis.usuario.idUsuario = this.form.value.usuario;

      if (this.edicion) {
        this.cS.update(this.crisis).subscribe(() => {
          this.cS.list().subscribe((data) => this.cS.setList(data));
          this.router.navigate(['/crisis']);
        });
      } else {
        this.cS.insert(this.crisis).subscribe(() => {
          this.cS.list().subscribe((data) => this.cS.setList(data));
          this.router.navigate(['/crisis']);
        });
      }
    }
  }

  init() {
    if (this.edicion) {
      this.cS.listId(this.id).subscribe((data) => {
        // Rellenar el formulario con los datos cargados
        this.form = new FormGroup({
          idCrisis: new FormControl(data.idCrisis),
          usuario: new FormControl(data.usuario.idUsuario), // <-- Asignar el ID del usuario
          fecha: new FormControl(data.fecha),
          tiempoRespuesta: new FormControl(data.tiempoRespuesta),
          ritmo: new FormControl(data.ritmo),
          articulacion: new FormControl(data.articulacion),
          f0_promedio: new FormControl(data.f0_promedio),
          formantesDetectados: new FormControl(data.formantesDetectados),
        });
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/crisis']);
  }
}