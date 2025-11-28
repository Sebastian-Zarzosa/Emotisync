import { Component, OnInit } from '@angular/core';
import { FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { RolService } from '../../../../core/services/rolservice';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { MatNativeDateModule} from '@angular/material/core';
import { provideNativeDateAdapter} from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from "@angular/material/card";
import { Rol } from '../../../../models/rol';

@Component({
  selector: 'app-insertarrol',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    CommonModule,
    MatRadioModule,
    MatNativeDateModule,
    MatButtonModule,
    MatCardModule
],
  templateUrl: './insertarrol.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './insertarrol.css',
})
export class Insertarrol implements OnInit {
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
    this.form = this.formBuilder.group({
      idRol: [''],
      rol: ['', Validators.required],
    });

    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
  }
  aceptar(): void {
    if (this.form.valid) {
      this.ro.idRol = this.form.value.rol;
      if (this.edicion) {
        this.ro.idRol = this.form.value.idRol
        this.rS.update(this.ro).subscribe(() => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data)
          })
        })
      } else {
        this.rS.insert(this.ro).subscribe(() => {
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
          idRol: new FormControl(data.idRol), 
          rol: new FormControl(data.rol)
        });
      });
    }
  }

  cancelar() {
    this.router.navigate(['/roles'])
  }
}

