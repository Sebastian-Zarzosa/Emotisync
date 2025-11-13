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
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './sintoma-insert.html',
  providers: [provideNativeDateAdapter()],
  styleUrls: ['./sintoma-insert.css'],
})
export class SintomaInsert implements OnInit {
  form: FormGroup = new FormGroup({});
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
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      codigo: [''],
      nombre: ['', Validators.required, Validators.minLength(3)],
      descripcion: ['', Validators.required, Validators.minLength(5)],
    });
  }

  init(): void {
    if (this.edicion) {
      this.sS.listId(this.id).subscribe((data) => {
        this.form.patchValue({
          codigo: data.id,
          nombre: data.nombre,
          descripcion: data.descripcion,
        });
      });
    }
  }

  aceptar(): void {
    if (this.form.valid) {
      this.sintoma.id = this.form.value.codigo;
      this.sintoma.nombre = this.form.value.nombre;
      this.sintoma.descripcion = this.form.value.descripcion;

      if (this.edicion) {
        this.sS.update(this.sintoma).subscribe(() => {
          this.router.navigate(['sintomas']);
        });
      } else {
        this.sS.insert(this.sintoma).subscribe(() => {
          this.router.navigate(['sintomas']);
        });
      }
    }
  }
}
