import { Component, OnInit } from '@angular/core';
import { FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

import { ActivatedRoute, Params, Router } from '@angular/router';
import { Rol } from '../../../models/rol';
import { RolService } from '../../../services/rol.service';

@Component({
  selector: 'app-softwareinsert',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatDatepickerModule,
    MatButtonModule,
  ],
  templateUrl: './insertarrol.html',
  providers: [provideNativeDateAdapter()],

  styleUrl: './insertarrol.css',
})
export class Softwareinsert implements OnInit {
  form: FormGroup = new FormGroup({});
  ro: Rol = new Rol();

  edicion: boolean = false;
  id: number = 0;

  constructor(
    private rS: RolService,
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
      nombre: ['', Validators.required],
      version: ['', Validators.required],
      tipo: ['', Validators.required],
      estado: [false, Validators.required],
      fecha: ['', Validators.required],
      proveedor: ['', Validators.required],
    });
  }
  aceptar(): void {
    if (this.form.valid) {
      this.ro.id = this.form.value.codigo;
      this.ro.nombre = this.form.value.nombre;
      if (this.edicion) {
         this.rS.update(this.ro).subscribe((data) => {
        this.rS.list().subscribe((data) => {
          this.rS.setList(data);
        });
      });
      } else {
        this.rS.insert(this.ro).subscribe((data) => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
          });
        });
      }
      this.router.navigate(['roles']);
    }
  }
  init() {
    if (this.edicion) {
      this.rS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.id),
          nombre: new FormControl(data.nombre),
        });
      });
    }
  }
}

