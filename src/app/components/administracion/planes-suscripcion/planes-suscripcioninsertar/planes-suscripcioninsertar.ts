import { Component, OnInit } from '@angular/core';
import {
  Form,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { planesSuscripcion } from '../../../../models/planes_suscripcion';
import { PlanesSuscripcionService } from '../../../../core/services/planes_suscripcionservice';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from "@angular/material/card";

@Component({
  selector: 'app-planes-suscripcioninsertar',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule
],
  templateUrl: './planes-suscripcioninsertar.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './planes-suscripcioninsertar.css',
})
export class PlanesSuscripcioninsertar implements OnInit {
  form: FormGroup = new FormGroup({});
  plan: planesSuscripcion = new planesSuscripcion();

  edicion: boolean = false;
  id: number = 0;
  nombresBase: string[] = ['Básico', 'Estándar', 'Premium', 'Familiar', 'Gold'];
  duraciones: string[] = ['Mensual', 'Semestral', 'Anual'];

  constructor(
    private pS: PlanesSuscripcionService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) { }
  
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      codigo: [''],
      nombreBase: ['', Validators.required], 
      duracion: ['', Validators.required],   
      precio: ['', [Validators.required, Validators.min(0)]],
      descripcion: ['', [Validators.required, Validators.maxLength(255)]]
    });
    
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    })
  }

  aceptar(): void{
    if (this.form.valid) {
      this.plan.idPlanesSuscripcion = this.form.value.codigo || 0;
      this.plan.nombre_plan = `${this.form.value.nombreBase} ${this.form.value.duracion}`;
      
      this.plan.precio = this.form.value.precio;
      this.plan.descripcion = this.form.value.descripcion;

      if (this.edicion) {
        this.pS.update(this.plan).subscribe(() => this.router.navigate(['/planes']));
      } else {
        this.pS.insert(this.plan).subscribe(() => this.router.navigate(['/planes']));
      }
    }
  }

  cancelar(): void {
    this.router.navigate(['/planes']);
  }

  init() {
    if (this.edicion) {
      this.pS.listId(this.id).subscribe((data) => {
        // Al editar, intentamos separar el nombre para mostrarlo en los campos
        // Si el nombre es "Premium Anual", separamos en "Premium" y "Anual"
        const partes = data.nombre_plan.split(' ');
        const duracionDetectada = this.duraciones.find(d => data.nombre_plan.includes(d)) || 'Mensual';
        const nombreDetectado = data.nombre_plan.replace(duracionDetectada, '').trim();

        this.form.patchValue({
          codigo: data.idPlanesSuscripcion,
          nombreBase: nombreDetectado,
          duracion: duracionDetectada,
          precio: data.precio,
          descripcion: data.descripcion
        });
      });
    }
  }
}
