import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';

import { CrisisSintoma } from '../../../../models/CrisisSintoma';
import { CrisisSintomaService } from '../../../../core/services/crisis-sintomaservice';
import { CrisisService } from '../../../../core/services/crisisservice';
import { Sintomaservice } from '../../../../core/services/sintomaservice';
import { Crisis } from '../../../../models/Crisis';
import { Sintoma } from '../../../../models/sintoma';

@Component({
  selector: 'app-crisis-sintoma-insert',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './crisis-sintomainsert.html',
  styleUrl: './crisis-sintomainsert.css'
})
export class CrisisSintomaInsert implements OnInit {
  form: FormGroup = new FormGroup({});
  cs: CrisisSintoma = new CrisisSintoma();
  edicion: boolean = false;
  id: number = 0;

  listaCrisis: Crisis[] = [];
  listaSintomas: Sintoma[] = [];

  constructor(
    private csService: CrisisSintomaService,
    private crisisService: CrisisService,
    private sintomaService: Sintomaservice,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: [''],
      crisisId: ['', Validators.required],
      sintomaId: ['', Validators.required],
      sever: ['', [Validators.required, Validators.min(1), Validators.max(10)]],
      observacion: ['', Validators.required],
      notas: ['']
    });

    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    // Cargar listas para los selects
    this.crisisService.list().subscribe(data => this.listaCrisis = data);
    this.sintomaService.list().subscribe(data => this.listaSintomas = data);
  }

  aceptar(): void {
    if (this.form.valid) {
      this.cs.id = this.form.value.id;
      this.cs.sever = this.form.value.sever;
      this.cs.observacion = this.form.value.observacion;
      this.cs.notas = this.form.value.notas;

      // Armamos los objetos completos para que el backend pueda extraer los IDs
      this.cs.crisis = new Crisis();
      this.cs.crisis.idCrisis = this.form.value.crisisId;

      this.cs.sintoma = new Sintoma();
      this.cs.sintoma.id = this.form.value.sintomaId;

      if (this.edicion) {
        this.csService.update(this.cs).subscribe(() => {
          this.csService.list().subscribe(data => this.csService.setList(data));
          this.router.navigate(['crisis-sintomas']);
        });
      } else {
        this.csService.insert(this.cs).subscribe(() => {
          this.csService.list().subscribe(data => this.csService.setList(data));
          this.router.navigate(['crisis-sintomas']);
        });
      }
    }
  }

  init() {
    if (this.edicion) {
      this.csService.listId(this.id).subscribe((data) => {
        this.form.patchValue({
          id: data.id,
          // Extraemos los IDs de los objetos que vienen del backend
          crisisId: data.crisis?.idCrisis,
          sintomaId: data.sintoma?.id,
          sever: data.sever,
          observacion: data.observacion,
          notas: data.notas
        });
      });
    }
  }

  cancelar() {
    this.router.navigate(['crisis-sintomas']);
  }
}