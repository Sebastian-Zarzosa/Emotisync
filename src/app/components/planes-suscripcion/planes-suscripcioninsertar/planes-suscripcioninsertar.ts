import { Component, OnInit } from '@angular/core';
import {
  Form,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { planesSuscripcion } from '../../../models/planes_suscripcionModel';
import { PlanesSuscripcionService } from '../../../services/planes_suscripcionservice';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-planes-suscripcioninsertar',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
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
  tipos: {value: string, viewValue: string}[] = [
    {value: 'Basico', viewValue: 'Basico'},
    {value: 'Premium', viewValue: 'Premium'},
    {value: 'Pro', viewValue: 'Pro'}
  ];

  constructor(
    private pS: PlanesSuscripcionService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) { }
  
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      codigo: [''],
      nombre_plan: ['', Validators.required],
      precio: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
    
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    })
  }

  aceptar(): void{
    if (this.form.valid) {
      this.plan.idPlanesSuscripcion = this.form.value.codigo;
      this.plan.nombre_plan = this.form.value.nombre_plan;
      this.plan.precio = this.form.value.precio;
      this.plan.descripcion = this.form.value.descripcion;

      if (this.edicion) {
        this.pS.update(this.plan).subscribe((data) => {
          this.pS.list().subscribe((data) => {
            this.pS.setList(data);
          })
        })
      } else {
        this.pS.insert(this.plan).subscribe((data) => {
          this.pS.list().subscribe((data) => {
            this.pS.setList(data);
          })
        })
      }
      this.router.navigate(['planes'])
    }
  }

  init() {
    if (this.edicion) {
      this.pS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idPlanesSuscripcion),
          nombre_plan: new FormControl(data.nombre_plan),
          precio: new FormControl(data.precio),
          descripcion: new FormControl(data.descripcion)
        })
      })
    }
  }
}
