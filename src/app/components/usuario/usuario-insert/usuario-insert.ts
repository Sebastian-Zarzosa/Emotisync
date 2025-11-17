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
import { UsuarioService } from '../../../services/usuarioservice';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { Rol } from '../../../models/Rol';
import { Rolservice } from '../../../services/rolservice';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-usuario-insert',
  imports: [
    CommonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatDatepickerModule,
    MatButtonModule,
    MatStepperModule,
    MatIconModule,
  ],
  templateUrl: './usuario-insert.html',
  styleUrl: './usuario-insert.css',
  providers: [provideNativeDateAdapter()],
})
export class UsuarioInsert implements OnInit {
  formStep1: FormGroup = new FormGroup({});
  formStep2: FormGroup = new FormGroup({});
  formStep3: FormGroup = new FormGroup({});
  formStep4: FormGroup = new FormGroup({});

  // form: FormGroup = new FormGroup({});
  user: Usuario = new Usuario();
  listaEspecialistas: Usuario[] = [];
  listaFamiliares: Usuario[] = [];
  listaRoles: Rol[] = [];

  edicion: boolean = false;
  id: number = 0;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private rolService: Rolservice
  ) {
    // Inicializar grupo
    this.formStep1 = this.formBuilder.group({
      idUsuario: [''],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    this.formStep2 = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellido: ['', [Validators.required, Validators.minLength(2)]],
      telefono: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.minLength(9),
        ],
      ],
      fechaNacimiento: ['', Validators.required],
    });
    this.formStep3 = this.formBuilder.group({
      institucion: [''],
      nroColegiatura: ['', [Validators.pattern('^[0-9]*$')]],
      especialidad: [''],
    });
    this.formStep4 = this.formBuilder.group({
      familiar: [''],
      especialista: [''],
      roles: [[], Validators.required],
      enabled: [true],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((data) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    // //Cargar listas
    // this.usuarioService.getListaEspecialistas().subscribe((data) => this.listaEspecialistas = data);
    // this.rolService.listar().subscribe((data) => this.listaRoles = data)
    // this.usuarioService.getListaFamiliares().subscribe((data) => this.listaFamiliares = data);

    this.usuarioService.getListaEspecialistas().subscribe((data) => {
      this.listaEspecialistas = data;
    });

    this.rolService.listar().subscribe((data) => {
      this.listaRoles = data;
    });

    this.usuarioService.getListaFamiliares().subscribe((data) => {
      this.listaFamiliares = data;
    });

    /*
    this.form = this.formBuilder.group({
      idUsuario: [''],
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellido: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      username: ['', [Validators.required]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(9)]],
      fechaNacimiento: ['', Validators.required],
      institucion: [''],
      nroColegiatura: ['', [Validators.pattern('^[0-9]*$')]],
      especialidad: [''],
      familiar: [''],
      especialista: [''],
      enabled: [true],
      roles: [[], Validators.required],
    });
    */
  }

  init() {
    if (this.edicion) {
      this.usuarioService.listarId(this.id).subscribe((data) => {
        //Paso 1: info de cuenta
        this.formStep1.get('idUsuario')?.setValue(data.idUsuario);
        this.formStep1.get('email')?.setValue(data.email);
        this.formStep1.get('username')?.setValue(data.username);

        //Paso 2: info personal
        this.formStep2.get('nombre')?.setValue(data.nombre);
        this.formStep2.get('apellido')?.setValue(data.apellido);
        this.formStep2.get('telefono')?.setValue(data.telefono);
        this.formStep2.get('fechaNacimiento')?.setValue(data.fechaNacimiento);

        //Paso 3: info profesional
        this.formStep3.get('institucion')?.setValue(data.institucion);
        this.formStep3.get('nroColegiatura')?.setValue(data.nroColegiatura);
        this.formStep3.get('especialidad')?.setValue(data.especialidad);

        //Paso 4: roles y relaciones
        this.formStep4.get('familiar')?.setValue(data.familiar?.idUsuario);
        this.formStep4
          .get('especialista')
          ?.setValue(data.especialista?.idUsuario);
        this.formStep4.get('enabled')?.setValue(data.enabled);
        this.formStep4.get('roles')?.setValue(data.roles);
        /*
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
          roles: new FormControl(data.roles),
          especialidad: new FormControl(data.especialidad),
          familiar: new FormControl(data.familiar?.idUsuario),
          especialista: new FormControl(data.especialista?.idUsuario),
          enabled: new FormControl(data.enabled),
        });
        */
      });
    }
  }

  aceptar(): void {
    if (
      this.formStep1.invalid ||
      this.formStep2.invalid ||
      this.formStep3.invalid ||
      this.formStep4.invalid
    ) {
      return;
    }

    const finalUserData = {
      ...this.formStep1.value,
      ...this.formStep2.value,
      ...this.formStep3.value,
      ...this.formStep4.value,
    };
    this.user.idUsuario = finalUserData.idUsuario;
    this.user.nombre = finalUserData.nombre;
    this.user.apellido = finalUserData.apellido;
    this.user.password = finalUserData.password;
    this.user.username = finalUserData.username;
    this.user.email = finalUserData.email;
    this.user.telefono = finalUserData.telefono;
    this.user.fechaNacimiento = finalUserData.fechaNacimiento;
    this.user.institucion = finalUserData.institucion;
    this.user.nroColegiatura = finalUserData.nroColegiatura;
    this.user.especialidad = finalUserData.especialidad;
    this.user.enabled = finalUserData.enabled;

    if (
      finalUserData.roles &&
      Array.isArray(finalUserData.roles) &&
      finalUserData.roles.length > 0
    ) {
      this.user.roles = finalUserData.roles
        .filter((rol: any) => rol != null)
        .map((rol: any) => ({
          idRol: rol.idRol,
        }));
    }

    if (finalUserData.familiar) {
      this.user.familiar = { idUsuario: finalUserData.familiar } as Usuario;
    }
    if (finalUserData.especialista) {
      this.user.especialista = {
        idUsuario: finalUserData.especialista,
      } as Usuario;
    }

    if (this.edicion) {
      this.usuarioService.update(this.user).subscribe({
        next: () => {
          this.usuarioService.listar().subscribe((data) => {
            this.usuarioService.setLista(data);
            this.router.navigate(['usuarios']);
          });
        },
        error: (err) => {
          console.error('Error al actualizar usuario:', err);
        },
      });
    } else {
      console.log(this.user);
      this.usuarioService.insertar(this.user).subscribe({
        next: () => {
          this.usuarioService.listar().subscribe((data) => {
            this.usuarioService.setLista(data);
            this.router.navigate(['usuarios']);
          });
        },
        error: (err) => {
          console.error('Error al registrar usuario:', err);
        },
      });
    }
  }
  cancelar(): void {
    this.router.navigate(['/usuarios']);
  }

  compareRoles(role1: Rol, role2: Rol): boolean {
    return role1 && role2 ? role1.idRol === role2.idRol : role1 === role2;
  }
}
