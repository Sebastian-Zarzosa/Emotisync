import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Sintoma } from '../../../models/sintoma';
import { Sintomaservice } from '../../../services/sintomaservice';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-sintomainsert',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './sintoma-insert.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './sintoma-insert.css',
})
export class SintomaInsert implements OnInit {
  // El formulario se inicializa vacío, se construirá en ngOnInit
  form!: FormGroup;
  sintoma: Sintoma = new Sintoma();
  edicion: boolean = false;
  id: number = 0;

  constructor(
    private sS: Sintomaservice,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // 1. Construye el formulario UNA SOLA VEZ
    this.form = this.formBuilder.group({
      codigo: [''], // El ID no es requerido, se usa para editar
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
    });

    // 2. Suscríbete a los parámetros de la ruta
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      
      // 3. Llama a init() DESPUÉS de construir el formulario
      this.init();
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      // Mapea los valores del formulario al objeto sintoma
      this.sintoma.id = this.form.value.codigo;
      this.sintoma.nombre = this.form.value.nombre;
      this.sintoma.descripcion = this.form.value.descripcion;

      if (this.edicion) {
        // --- BUENA PRÁCTICA: Añadir manejo de errores ---
        this.sS.update(this.sintoma).subscribe({
          next: () => {
            // Actualiza la lista en el servicio
            this.sS.list().subscribe((data) => {
              this.sS.setList(data);
            });
            this.router.navigate(['sintomas']); // Navega de vuelta
          },
          error: (err) => {
            console.error('Error al actualizar el síntoma:', err);
          },
        });
      } else {
        // --- BUENA PRÁCTICA: Añadir manejo de errores ---
        this.sS.insert(this.sintoma).subscribe({
          next: () => {
            // Actualiza la lista en el servicio
            this.sS.list().subscribe((data) => {
              this.sS.setList(data);
            });
            this.router.navigate(['sintomas']); // Navega de vuelta
          },
          error: (err) => {
            console.error('Error al insertar el síntoma:', err);
          },
        });
      }
    } else {
      console.log('Formulario no es válido');
    }
  }

  init() {
    if (this.edicion) {
      this.sS.listId(this.id).subscribe((data) => {
        // 4. En lugar de RECREAR el form, usa setValue o patchValue para RELLENARLO
        this.form.setValue({
          codigo: data.id,
          nombre: data.nombre,
          descripcion: data.descripcion,
        });
      });
    }
    // Si no es edición, el formulario ya está listo (vacío) desde ngOnInit
  }
}