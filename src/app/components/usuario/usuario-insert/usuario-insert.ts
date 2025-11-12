import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Usuario } from '../../../models/Usuario';
import { Usuarioservice } from '../../../services/usuarioservice';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { Rol } from '../../../models/Rol';

@Component({
  selector: 'app-usuario-insert',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatDatepickerModule,
    MatButtonModule,
  ],
  templateUrl: './usuario-insert.html',
  styleUrl: './usuario-insert.css',
  providers: [provideNativeDateAdapter()],
})
export class UsuarioInsert implements OnInit {
  form: FormGroup = new FormGroup({});
  user: Usuario = new Usuario();

  listaEspecialistas: Usuario[] = [];
  listaFamiliares: Usuario[] = [];

  listaRoles: Rol[] = [
    { idRol: 1, rol: 'ADMIN' },
    { idRol: 2, rol: 'PACIENTE' },
    { idRol: 3, rol: 'ESPECIALISTA' },
  ];

  edicion: boolean = false;
  id: number = 0;
  constructor(
    private usuarioService: Usuarioservice,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((data) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.usuarioService.getListaEspecialistas().subscribe((data) => {
      this.listaEspecialistas = data;
    });

    this.usuarioService.getListaFamiliares().subscribe((data) => {
      this.listaFamiliares = data;
    });

    this.form = this.formBuilder.group({
      idUsuario: [''],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      username: ['', Validators.required],
      telefono: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      institucion: [''],
      nroColegiatura: [''],
      especialidad: [''],
      familiar: [''],
      especialista: [''],
      enabled: [true],
      rol: ['', Validators.required],
    });
  }

  init() {
    if (this.edicion) {
      this.usuarioService.listarId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          idUsuario: new FormControl(data.idUsuario),
          nombre: new FormControl(data.nombre),
          apellido: new FormControl(data.apellido),
          email: new FormControl(data.email),
          username: new FormControl(data.username),
          password: new FormControl(data.password),
          telefono: new FormControl(data.telefono),
          fechaNacimiento: new FormControl(data.fechaNacimiento),
          institucion: new FormControl(data.institucion),
          nroColegiatura: new FormControl(data.nroColegiatura),
          rol: new FormControl(data.roles),
          especialidad: new FormControl(data.especialidad),
          familiar: new FormControl(data.familiar?.idUsuario),
          especialista: new FormControl(data.especialista?.idUsuario),
          enabled: new FormControl(data.enabled),
        });
      });
    }
  }

  aceptar(): void {
    if (this.form.valid) {
      this.user.idUsuario = this.form.value.idUsuario;
      this.user.nombre = this.form.value.nombre;
      this.user.apellido = this.form.value.apellido;
      this.user.password = this.form.value.password;
      this.user.username = this.form.value.username;
      this.user.email = this.form.value.email;
      this.user.telefono = this.form.value.telefono;
      this.user.fechaNacimiento = this.form.value.fechaNacimiento;
      this.user.institucion = this.form.value.institucion;
      this.user.nroColegiatura = this.form.value.nroColegiatura;
      this.user.especialidad = this.form.value.especialidad;
      this.user.enabled = this.form.value.enabled;
      this.user.roles = [this.form.value.rol];

      // Asignar familiar y especialista solo si tienen valor
      if (this.form.value.familiar) {
        this.user.familiar = { idUsuario: this.form.value.familiar } as Usuario;
      }
      if (this.form.value.especialista) {
        this.user.especialista = {
          idUsuario: this.form.value.especialista,
        } as Usuario;
      }

      if (this.edicion) {
        this.usuarioService.update(this.user).subscribe(() => {
          this.usuarioService.listar().subscribe((data) => {
            this.usuarioService.setLista(data);
          });
        });
      } else {
        this.usuarioService.insertar(this.user).subscribe(() => {
          this.usuarioService.listar().subscribe((data) => {
            this.usuarioService.setLista(data);
          });
        });
      }
      this.router.navigate(['usuarios']);
    }
  }
}
