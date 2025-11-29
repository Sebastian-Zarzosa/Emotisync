import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { CrisisList } from '../crisis-list/crisis-list';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Crisis } from '../../../../models/Crisis';
import { CrisisService } from '../../../../core/services/crisisservice';
import { UsuarioService } from '../../../../core/services/usuarioservice';
import { Usuario } from '../../../../models/Usuario';

@Component({
  selector: 'app-crisis-insert',
  imports: [CommonModule,MatCardModule,ReactiveFormsModule,MatFormFieldModule,MatInputModule,MatSelectModule,MatRadioModule,MatDatepickerModule,MatButtonModule,MatStepperModule,MatIconModule],
  templateUrl: './crisis-insert.html',
  styleUrl: './crisis-insert.css',
  providers: [provideNativeDateAdapter()],
})
export class CrisisInsert implements OnInit {
  // Grupos de formularios para los pasos
  formStep1: FormGroup = new FormGroup({});
  formStep2: FormGroup = new FormGroup({});
  formStep3: FormGroup = new FormGroup({});
  formStep4: FormGroup = new FormGroup({});

  crisis: Crisis = new Crisis();
  
  // Listas necesarias para los selectores
  listaUsuarios: Usuario[] = []; 

  edicion: boolean = false;
  id: number = 0;

  constructor(
    private crisisService: CrisisService,
    private usuarioService: UsuarioService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {
    // Paso 1: Datos Generales (Fecha y Usuario)
    this.formStep1 = this.formBuilder.group({
      idCrisis: [0],
      fecha: [new Date(), Validators.required],
      usuario: ['', Validators.required], // El ID del usuario asociado
    });

    // Paso 2: Metricas Temporales
    this.formStep2 = this.formBuilder.group({
      tiempoRespuesta: [0, [Validators.required, Validators.min(0)]],
      ritmo: [0, [Validators.required, Validators.min(0)]],
    });

    // Paso 3: Metricas Acusticas (Voz)
    this.formStep3 = this.formBuilder.group({
      articulacion: [0, [Validators.required, Validators.min(0)]],
      f0_promedio: [0, [Validators.required, Validators.min(0)]],
    });

    // Paso 4: Analisis Avanzado (Formantes y Otros)
    this.formStep4 = this.formBuilder.group({
      formantesDetectados: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Verificar si es edicion o insercion
    this.route.params.subscribe((data) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    // Cargar listas necesarias (Select de Usuarios)
    this.usuarioService.listar().subscribe((data) => {
      this.listaUsuarios = data;
    });
  }

  init() {
    if (this.edicion) {
      this.crisisService.listId(this.id).subscribe((data) => {
        // Paso 1
        this.formStep1.get('idCrisis')?.setValue(data.idCrisis);
        this.formStep1.get('fecha')?.setValue(data.fecha);
        this.formStep1.get('usuario')?.setValue(data.usuario?.idUsuario);

        // Paso 2
        this.formStep2.get('tiempoRespuesta')?.setValue(data.tiempoRespuesta);
        this.formStep2.get('ritmo')?.setValue(data.ritmo);

        // Paso 3
        this.formStep3.get('articulacion')?.setValue(data.articulacion);
        this.formStep3.get('f0_promedio')?.setValue(data.f0_promedio);

        // Paso 4
        this.formStep4.get('formantesDetectados')?.setValue(data.formantesDetectados);
      });
    }
  }

  aceptar(): void {
    // Validacion general de todos los pasos
    if (
      this.formStep1.invalid ||
      this.formStep2.invalid ||
      this.formStep3.invalid ||
      this.formStep4.invalid
    ) {
      return;
    }

    // Unificar la data de los formularios
    const finalData = {
      ...this.formStep1.value,
      ...this.formStep2.value,
      ...this.formStep3.value,
      ...this.formStep4.value,
    };

    // Mapeo al objeto Crisis
    this.crisis.idCrisis = finalData.idCrisis ? finalData.idCrisis : 0;
    this.crisis.fecha = finalData.fecha;
    this.crisis.tiempoRespuesta = finalData.tiempoRespuesta;
    this.crisis.ritmo = finalData.ritmo;
    this.crisis.articulacion = finalData.articulacion;
    this.crisis.f0_promedio = finalData.f0_promedio;
    this.crisis.formantesDetectados = finalData.formantesDetectados;

    // Asignar el objeto Usuario
    if (finalData.usuario) {
      let u = new Usuario();
      u.idUsuario = finalData.usuario;
      this.crisis.usuario = u;
    }

    if (this.edicion) {
      // Actualizar
      this.crisisService.update(this.crisis).subscribe({
        next: () => {
          this.crisisService.list().subscribe((data) => {
            this.crisisService.setList(data);
            this.router.navigate(['crisis']);
          });
        },
        error: (err) => {
          console.error('Error al actualizar crisis:', err);
        },
      });
    } else {
      // Insertar
      this.crisisService.insert(this.crisis).subscribe({
        next: () => {
          this.crisisService.list().subscribe((data) => {
            this.crisisService.setList(data);
            this.router.navigate(['crisis']);
          });
        },
        error: (err) => {
          console.error('Error al registrar crisis:', err);
        },
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/crisis']);
  }
}


