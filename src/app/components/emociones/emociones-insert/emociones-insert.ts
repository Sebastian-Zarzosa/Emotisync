import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { Emociones } from '../../../models/Emociones';
import { ActivatedRoute, Params, Router } from '@angular/router';
// import { Emocionesservice } from '../../../services/emocionesservice';
import { Crisis } from '../../../models/crisis';
// import { CrisisService } from '../../../services/crisisservice';
import { Emocionesservice } from '../../../core/services/emocionesservice';
import { CrisisService } from '../../../core/services/crisisservice';

@Component({
  selector: 'app-emociones-insert',
  imports: [CommonModule,MatCardModule,ReactiveFormsModule,MatFormFieldModule,MatInputModule,MatSelectModule,MatRadioModule,MatDatepickerModule,MatButtonModule,MatStepperModule,MatIconModule],
  templateUrl: './emociones-insert.html',
  styleUrl: './emociones-insert.css',
  providers: [provideNativeDateAdapter()],
})
export class EmocionesInsert implements OnInit {
  form: FormGroup = new FormGroup({});
  emo: Emociones = new Emociones();

  listaCrisis: Crisis[] = []; // <--- Lista para llenar el Select, al momento de registrar emociones, que salga el listado de crisis para elegir
  // Lista para el desplegable de intensidad:
  niveles: number[] = [1, 2, 3, 4, 5];

  edicion: boolean = false;
  id: number = 0;

  constructor(
    private eService: Emocionesservice,
    private cService: CrisisService, // <--- Inyectamos el servicio de Crisis
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      idEmociones: [''],
      tipoEmocion: ['', Validators.required],
      intensidad: ['', Validators.required],
      crisis: ['', Validators.required], // <--- Ahora sí 
    });

    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    // Cargamos la lista de crisis usando el método list()
    this.cService.list().subscribe((data) => {
      this.listaCrisis = data;
    });
  }

  init() {
    if (this.edicion) {
      this.eService.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          idEmociones: new FormControl(data.idEmociones), 
          tipoEmocion: new FormControl(data.tipoEmocion),
          intensidad: new FormControl(data.intensidad),
          //crisis
          crisis: new FormControl(data.crisis), // Cargamos el objeto crisis
        });
      });
    }
  }

  aceptar(): void {
    if (this.form.valid) {
      // Asignamos los valores del formulario al objeto
      this.emo.tipoEmocion = this.form.value.tipoEmocion;
      this.emo.intensidad = this.form.value.intensidad;
      this.emo.crisis = this.form.value.crisis; // <--- Asignamos la crisis seleccionada

      if (this.edicion) {
        // this.emo.idEmociones = this.form.value.idEmociones // antes: confiamos en el formulario para el ID (pero puede estar vacío o bloqueado).
        this.emo.idEmociones = this.id; // ahora: usamos 'this.id', que capturamos de la URL (ruta) al principio.
        // Actualizar
        this.eService.update(this.emo).subscribe(() => {
          this.eService.listar().subscribe((data) => {
            this.eService.setList(data)
            this.router.navigate(['emociones']);
          })
        })
      } else {
        // Insertar
        this.eService.insert(this.emo).subscribe(() => {
          this.eService.listar().subscribe((data) => {
            this.eService.setList(data);
            this.router.navigate(['emociones']);
          });
        });
      }
    }
  }

  cancelar() {
    this.router.navigate(['/emociones'])
  }
}
