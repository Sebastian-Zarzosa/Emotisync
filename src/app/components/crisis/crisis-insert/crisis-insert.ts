// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
// import { CrisisList } from '../crisis-list/crisis-list';
// import { CommonModule } from '@angular/common';
// import { MatCardModule } from '@angular/material/card';
// import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatSelectModule } from '@angular/material/select';
// import { MatRadioModule } from '@angular/material/radio';
// import { MatDatepickerModule } from '@angular/material/datepicker';
// import { MatButtonModule } from '@angular/material/button';
// import { MatStepperModule } from '@angular/material/stepper';
// import { MatIconModule } from '@angular/material/icon';
// import { provideNativeDateAdapter } from '@angular/material/core';
// import { Crisis } from '../../../models/Crisis';
// import { CrisisService } from '../../../services/crisisservice';
// import { UsuarioService } from '../../../services/usuarioservice';

// @Component({
//   selector: 'app-crisis-insert',
//   imports: [CommonModule,MatCardModule,ReactiveFormsModule,MatFormFieldModule,MatInputModule,MatSelectModule,MatRadioModule,MatDatepickerModule,MatButtonModule,MatStepperModule,MatIconModule],
//   templateUrl: './crisis-insert.html',
//   styleUrl: './crisis-insert.css',
//   providers: [provideNativeDateAdapter()],
// })
// export class CrisisInsert implements OnInit {
//   formStep1: FormGroup = new FormGroup({}); // datos generales
//   formStep2: FormGroup = new FormGroup({}); // metricas temporales
//   formStep3: FormGroup = new FormGroup({}); // analisis acustico

//   // form: FormGroup = new FormGroup({});
//   crisis: Crisis = new Crisis();
  
//   constructor(
//     private crisisService: CrisisService,
//     private usuarioService: UsuarioService,
//     private router: Router,
//     private formBuilder: FormBuilder,
//     private route: ActivatedRoute,
//   ){
//     // PASO 1: Datos Generales (Fecha y Usuario)
//     this.formStep1 = this.formBuilder.group({
//       idCrisis: [''],
//       fecha: [new Date(), Validators.required],
//       usuario: ['', Validators.required], // Aqui seleccionas el ID del usuario
//     });

//     // PASO 2: Metricas Temporales
//     this.formStep2 = this.formBuilder.group({
//       tiempoRespuesta: [0, [Validators.required, Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$')]], // Acepta decimales
//       ritmo: [0, [Validators.required, Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$')]],
//     });

//     // PASO 3: Analisis Acustico
//     this.formStep3 = this.formBuilder.group({
//       articulacion: [0, [Validators.required]],
//       f0_promedio: [0, [Validators.required]],
//       formantesDetectados: ['', Validators.maxLength(255)], // String descriptivo
//     });
//   }

  // ngOnInit(): void {
  //   // 1. Obtener ID de la URL si es edición
  //   this.route.params.subscribe((data) => {
  //     this.id = data['id'];
  //     this.edicion = data['id'] != null;
  //     this.init();
  //   });

  //   // 2. Cargar lista de usuarios para el mat-select
  //   this.usuarioService.listar().subscribe((data) => {
  //     this.listaUsuarios = data;
  //   });
  // }

  // init() {
  //   if (this.edicion) {
  //     this.crisisService.listarId(this.id).subscribe((data) => {
  //       // Llenar Paso 1
  //       this.formStep1.get('idCrisis')?.setValue(data.idCrisis);
  //       this.formStep1.get('fecha')?.setValue(data.fecha);
  //       this.formStep1.get('usuario')?.setValue(data.usuario?.idUsuario);

  //       // Llenar Paso 2
  //       this.formStep2.get('tiempoRespuesta')?.setValue(data.tiempoRespuesta);
  //       this.formStep2.get('ritmo')?.setValue(data.ritmo);

  //       // Llenar Paso 3
  //       this.formStep3.get('articulacion')?.setValue(data.articulacion);
  //       this.formStep3.get('f0_promedio')?.setValue(data.f0_promedio);
  //       this.formStep3.get('formantesDetectados')?.setValue(data.formantesDetectados);
  //     });
  //   }
  // }

  // aceptar(): void {
  //   // Validar todos los pasos
  //   if (
  //     this.formStep1.invalid ||
  //     this.formStep2.invalid ||
  //     this.formStep3.invalid
  //   ) {
  //     return;
  //   }

  //   // Unificar la data de los 3 formularios
  //   const finalData = {
  //     ...this.formStep1.value,
  //     ...this.formStep2.value,
  //     ...this.formStep3.value,
  //   };

  // }

  // Mapear al objeto Crisis
//     this.crisis.idCrisis = finalData.idCrisis;
//     this.crisis.fecha = finalData.fecha;
//     this.crisis.tiempoRespuesta = finalData.tiempoRespuesta;
//     this.crisis.ritmo = finalData.ritmo;
//     this.crisis.articulacion = finalData.articulacion;
//     this.crisis.f0_promedio = finalData.f0_promedio;
//     this.crisis.formantesDetectados = finalData.formantesDetectados;

//   // Mapear objeto Usuario (Importante: solo enviamos el ID anidado)
//     if (finalData.usuario) {
//       this.crisis.usuario = { idUsuario: finalData.usuario } as Usuario;
//     }

//   // Lógica de Insertar vs Actualizar
//     if (this.edicion) {
//       this.crisisService.update(this.crisis).subscribe({
//         next: () => {
//           this.crisisService.listar().subscribe((data) => {
//             this.crisisService.setLista(data); // Si usas Subject en el servicio
//             this.router.navigate(['crisis']);
//           });
//         },
//         error: (err) => console.error('Error actualizando:', err),
//       });
//     } else {
//       this.crisisService.insertar(this.crisis).subscribe({
//         next: () => {
//           this.crisisService.listar().subscribe((data) => {
//             this.crisisService.setLista(data);
//             this.router.navigate(['crisis']);
//           });
//         },
//         error: (err) => console.error('Error registrando:', err),
//       });
//     }
  

//     cancelar(): void {
//     this.router.navigate(['/crisis']);
//   }
// }


