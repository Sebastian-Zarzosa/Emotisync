import { Routes } from '@angular/router';
import { Inicio } from './components/inicio/inicio';
import { Conocer } from './components/conocer/conocer';
import { Rol } from './components/rol/rol';
import { Insertarrol } from './components/rol/insertarrol/insertarrol';
import { Usuario } from './components/usuario/usuario';
import { UsuarioInsert } from './components/usuario/usuario-insert/usuario-insert';
import { Sintoma } from './components/sintoma/sintoma';
import { SintomaInsert } from './components/sintoma/sintoma-insert/sintoma-insert';
import { PlanesSuscripcion } from './components/planes-suscripcion/planes-suscripcion';
import { PlanesSuscripcioninsertar } from './components/planes-suscripcion/planes-suscripcioninsertar/planes-suscripcioninsertar';
import { Diario } from './components/diario/diario';
import { DiarioInsertar } from './components/diario/diario-insertar/diario-insertar';
import { UsuarioSuscripcion } from './components/usuario-suscripcion/usuario-suscripcion';
import { UsuarioSuscripcioninsertar } from './components/usuario-suscripcion/usuario-suscripcioninsertar/usuario-suscripcioninsertar';
import { Alertas } from './components/alertas/alertas';
import { AlertasInsertar } from './components/alertas/alertas-insertar/alertas-insertar';
import { Recurso } from './components/recurso/recurso';
import { RecursoInsert } from './components/recurso/recurso-insert/recurso-insert';
import { Ejercicio } from './models/ejercicio';
import { Ejercicioinsertar } from './components/ejercicios/ejercicioinsertar/ejercicioinsertar';
import { Ejercicios } from './components/ejercicios/ejercicios';
import { Crisis } from './components/crisis/crisis';
// import { CrisisInsert } from './components/crisis/crisis-insert/crisis-insert';
import { Login } from './components/login/login';
import { Registro } from './components/registro/registro';
import { UsuarioEjercicios } from './components/usuario-ejercicios/usuario-ejercicios';
import { UsuarioEjerciciosinsertar } from './components/usuario-ejercicios/usuario-ejerciciosinsertar/usuario-ejerciciosinsertar';


export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: Inicio },
  { path: 'conocer', component: Conocer },

  //Rutas de login/registro
  { path: 'login', component: Login },
  {path: 'registro', component: Registro},

  //Rutas de usuario
  {
    path: 'usuarios',
    component: Usuario,
    children: [
      { path: 'insert', component: UsuarioInsert },
      { path: 'edit/:id', component: UsuarioInsert },
    ],
  },
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },

  //Rutas de sintomas
  {
    path: 'sintomas',
    component: Sintoma,
    children: [
      { path: 'new', component: SintomaInsert },
      { path: 'edits/:id', component: SintomaInsert },
    ],
  },

  { path: '', redirectTo: 'sintomas', pathMatch: 'full' },
  
  {
    path: 'recursos',
    component: Recurso,
    children: [
      { path: 'insert', component: RecursoInsert },
      { path: 'edit/:id', component: RecursoInsert },
    ],
  },
  //Rutas de planes de suscripcion
  {
    path: 'planes',
    component: PlanesSuscripcion,
    children: [
      { path: 'insertar', component: PlanesSuscripcioninsertar },
      { path: 'editar/:id', component: PlanesSuscripcioninsertar },
    ],
  },
  {
    path: 'diarios',
    component: Diario,
    children: [
      { path: 'insert', component: DiarioInsertar },
      { path: 'edit/:id', component: DiarioInsertar },
    ],
  },
  {
    path: 'usuario-suscripcion',
    component: UsuarioSuscripcion,
    children: [
      { path: 'insertar', component: UsuarioSuscripcioninsertar },
      { path: 'editar/:id', component: UsuarioSuscripcioninsertar },
    ],
  },

  { path: '', redirectTo: 'usuario-suscripcion', pathMatch: 'full' },

  // Rutas de crisis
    {
    path: 'crisis',
    component: Crisis,
    // children: [
    //     { path: 'insertar', component: CrisisInsert },
    //     { path: 'edits/:id', component: CrisisInsert },
    // ],
    },
    
  {
    path: 'alerta',
    component: Alertas,
    children: [
      { path: 'insertar', component: AlertasInsertar },
      { path: 'editar/:id', component: AlertasInsertar }
    ]
  },


  { path: '', redirectTo: 'alerta', pathMatch: 'full'},
  {
    path: 'usuarioEjercicios',
    component: UsuarioEjercicios,
    children: [
      {path: 'insertar', component: UsuarioEjerciciosinsertar},
      {path: 'editar/:id', component: UsuarioEjerciciosinsertar}
      ],
  },
    {path: 'ejercicios',
        component: Ejercicios,
        children: [
            {path: 'news', component: Ejercicioinsertar},
            {path: 'edits/:id', component: Ejercicioinsertar},
        ],
    },
    { path: '', redirectTo: 'ejercicios', pathMatch: 'full'},
  
  
  // Rutas de roles
  {
    path: 'roles',
    component: Rol,
    children: [
        { path: 'insertar', component: Insertarrol },
        { path: 'edits/:id', component: Insertarrol },
      ],
    },
  { path: '', redirectTo: 'roles', pathMatch: 'full' },

  {path: '**', redirectTo: 'inicio'},

  
];

