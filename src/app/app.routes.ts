import { Routes } from '@angular/router';
import { Inicio } from './components/landing/inicio/inicio';
import { Conocer } from './components/landing/conocer/conocer';
import { Rol } from './components/administracion/rol/rol';
import { Insertarrol } from './components/administracion/rol/insertarrol/insertarrol';
import { Usuario } from './components/administracion/usuario/usuario';
import { UsuarioInsert } from './components/administracion/usuario/usuario-insert/usuario-insert';
import { Sintoma } from './components/clinica/sintoma/sintoma';
import { SintomaInsert } from './components/clinica/sintoma/sintoma-insert/sintoma-insert';
import { PlanesSuscripcion } from './components/administracion/planes-suscripcion/planes-suscripcion';
import { PlanesSuscripcioninsertar } from './components/administracion/planes-suscripcion/planes-suscripcioninsertar/planes-suscripcioninsertar';
import { Diario } from './components/herramientas/diario/diario';
import { DiarioInsertar } from './components/herramientas/diario/diario-insertar/diario-insertar';
import { UsuarioSuscripcion } from './components/administracion/usuario-suscripcion/usuario-suscripcion';
import { UsuarioSuscripcioninsertar } from './components/administracion/usuario-suscripcion/usuario-suscripcioninsertar/usuario-suscripcioninsertar';
import { Alertas } from './components/clinica/alertas/alertas';
import { AlertasInsertar } from './components/clinica/alertas/alertas-insertar/alertas-insertar';
import { Recurso } from './components/herramientas/recurso/recurso';
import { RecursoInsert } from './components/herramientas/recurso/recurso-insert/recurso-insert';
import { Ejercicioinsertar } from './components/herramientas/ejercicios/ejercicioinsertar/ejercicioinsertar';
import { Ejercicios } from './components/herramientas/ejercicios/ejercicios';
import { Crisis } from './components/clinica/crisis/crisis';
import { CrisisInsert } from './components/clinica/crisis/crisis-insert/crisis-insert';
import { Login } from './components/auth/login/login';
import { Registro } from './components/auth/registro/registro';
import { UsuarioEjercicios } from './components/herramientas/usuario-ejercicios/usuario-ejercicios';
import { UsuarioEjerciciosinsertar } from './components/herramientas/usuario-ejercicios/usuario-ejerciciosinsertar/usuario-ejerciciosinsertar';
import { roleGuard } from './core/guard/role.guard';
import { Principal } from './components/dashboard/principal/principal';
import { GrabadoraComponent } from './components/herramientas/grabadora/grabadora';
import { ModoReflexionComponent } from './components/clinica/crisis/modo-reflexion';
import { ProgresoComponent } from './components/herramientas/progreso/progreso';
import { JuegosComponent } from './components/herramientas/juegos/juegos';
import { BibliotecaComponent } from './components/herramientas/biblioteca/biblioteca';
import { PerfilComponent } from './components/dashboard/perfil/perfil';

import { EmocionesInsert } from './components/emociones/emociones-insert/emociones-insert';
import { Emociones } from './components/emociones/emociones';
import { ReportesMenu } from './components/administracion/reportes/reportes-menu/reportes-menu';
import { GrafPromemociointen } from './components/administracion/reportes/r-emociones/graf-promemociointen/graf-promemociointen';
import { GrafConteoComponent } from './components/administracion/reportes/r-alertas/graf-conteo/graf-conteo';
import { GrafBusquedaComponent } from './components/administracion/reportes/r-alertas/graf-busqueda/graf-busqueda';
import { GrafPromedioComponent } from './components/administracion/reportes/r-alertas/graf-promedio/graf-promedio';
import { GrafCriticasComponent } from './components/administracion/reportes/r-alertas/graf-criticas/graf-criticas';

import { CrisisSintoma } from './components/clinica/crisis-sintoma/crisis-sintoma';
import { CrisisSintomaInsert } from './components/clinica/crisis-sintoma/crisis-sintomainsert/crisis-sintomainsert';
import { PacientesEspecialidad } from './components/administracion/reportes/r-usuarios/pacientes-especialidad/pacientes-especialidad';
import { BusquedaPacientes } from './components/administracion/reportes/r-usuarios/busqueda-pacientes/busqueda-pacientes';
import { Musica } from './components/herramientas/musica/musica';

export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: Inicio },
  { path: 'conocer', component: Conocer },
  { path: 'login', component: Login },
  { path: 'registro', component: Registro },

  {
    path: 'dashboard',
    component: Principal,
    canActivate: [roleGuard], // Haremos un truco en el Guard o ponemos ADMIN y que el guard deje pasar si es paciente
  },

  //RUTAS DEL ADMIN
  {
    path: 'usuarios',
    component: Usuario,
    children: [
      { path: 'insert', component: UsuarioInsert },
      { path: 'edit/:id', component: UsuarioInsert },
    ],
    canActivate: [roleGuard],
    data: { expectedRole: 'ADMIN' },
  },
  {
    path: 'sintomas',
    component: Sintoma,
    children: [
      { path: 'insertar', component: SintomaInsert }, // Antes era 'new'
      { path: 'editar/:id', component: SintomaInsert }, // Antes era 'edits/:id'
    ],
    canActivate: [roleGuard],
    data: { expectedRole: 'ADMIN' },
  },
  {
    path: 'crisis-sintomas',
    component: CrisisSintoma,
    children: [
      { path: 'insertar', component: CrisisSintomaInsert },
      { path: 'editar/:id', component: CrisisSintomaInsert },
    ],
    canActivate: [roleGuard],
    data: { expectedRole: 'ADMIN' },
  },
  {
    path: 'crisis-sintomas',
    component: CrisisSintoma,
    children: [
      { path: 'insertar', component: CrisisSintomaInsert },
      { path: 'editar/:id', component: CrisisSintomaInsert },
    ],
    canActivate: [roleGuard],
    data: { expectedRole: 'ADMIN' },
  },
  {
    path: 'roles',
    component: Rol,
    children: [
      { path: 'insertar', component: Insertarrol },
      { path: 'edits/:id', component: Insertarrol },
    ],
    canActivate: [roleGuard],
    data: { expectedRole: 'ADMIN' },
  },
  {
    path: 'planes',
    component: PlanesSuscripcion,
    children: [
      { path: 'insertar', component: PlanesSuscripcioninsertar },
      { path: 'editar/:id', component: PlanesSuscripcioninsertar },
    ],
    canActivate: [roleGuard],
    data: { expectedRole: 'ADMIN' },
  },
  {
    path: 'usuario-suscripcion',
    component: UsuarioSuscripcion,
    children: [
      { path: 'insertar', component: UsuarioSuscripcioninsertar },
      { path: 'editar/:id', component: UsuarioSuscripcioninsertar },
    ],
    canActivate: [roleGuard],
    data: { expectedRole: 'ADMIN' },
  },
  {
    path: 'ejercicios',
    component: Ejercicios,
    children: [
      { path: 'insertar', component: Ejercicioinsertar }, // Antes era 'news'
      { path: 'editar/:id', component: Ejercicioinsertar }, // Antes era 'edits/:id'
    ],
    canActivate: [roleGuard],
    data: { expectedRole: 'ADMIN' },
  },
  {
    path: 'alerta',
    component: Alertas,
    children: [
      { path: 'insertar', component: AlertasInsertar },
      { path: 'editar/:id', component: AlertasInsertar },
    ],
    canActivate: [roleGuard],
    data: { expectedRole: 'ADMIN' },
  },
  {
    path: 'crisis',
    component: Crisis,
    children: [
      { path: 'insertar', component: CrisisInsert },
      { path: 'edits/:id', component: CrisisInsert },
    ],
    canActivate: [roleGuard],
    data: { expectedRole: 'ADMIN' },
  },

  //RUTAS DEL PACIENTE
  {
    path: 'diarios',
    component: Diario,
    children: [
      { path: 'insert', component: DiarioInsertar },
      { path: 'edit/:id', component: DiarioInsertar },
    ],
    canActivate: [roleGuard],
    data: { expectedRole: 'PACIENTE' },
  },
  {
    path: 'usuarioEjercicios',
    component: UsuarioEjercicios,
    children: [
      { path: 'insertar', component: UsuarioEjerciciosinsertar },
      { path: 'editar/:id', component: UsuarioEjerciciosinsertar },
    ],
    canActivate: [roleGuard],
    data: { expectedRole: 'PACIENTE' },
  },
  {
    path: 'recursos',
    component: Recurso,
    children: [
      { path: 'insert', component: RecursoInsert },
      { path: 'edit/:id', component: RecursoInsert },
    ],
    canActivate: [roleGuard],
    data: { expectedRole: 'PACIENTE' },
  },

  // Rutas de emocinoes
  {
    path: 'emociones',
    component: Emociones,
    children: [
      { path: 'insertar', component: EmocionesInsert },
      { path: 'edits/:id', component: EmocionesInsert },
    ],
  },

  // REPORTES
  // {
  //   path: 'reportes', // Esto hace match con routerLink="/reportes"
  //   component: EmocionesPromemociointen, // Aquí cargará tu componente del gráfico
  // },

  // crisis/buscarporritmo
  // crisis/buscarporusurangofechas
  // crisis/cantidadporusu
  // emociones/busquedaemoint5
  // emociones/promemociointen

  {
    path: 'grabadora',
    component: GrabadoraComponent,
    canActivate: [roleGuard],
    data: { expectedRole: 'PACIENTE' },
  },
  {
    path: 'modo-reflexion',
    component: ModoReflexionComponent,
    canActivate: [roleGuard],
    data: { expectedRole: 'PACIENTE' },
  },
  {
    path: 'progreso',
    component: ProgresoComponent,
    canActivate: [roleGuard],
    data: { expectedRole: 'PACIENTE' },
  },
  {
    path: 'juegos',
    component: JuegosComponent,
    canActivate: [roleGuard],
    data: { expectedRole: 'PACIENTE' },
  },
  {
    path: 'biblioteca',
    component: BibliotecaComponent,
    canActivate: [roleGuard],
    data: { expectedRole: 'PACIENTE' },
  },

  // Rutas de emocinoes
  {
    path: 'emociones',
    component: Emociones,
    children: [
      { path: 'insertar', component: EmocionesInsert },
      { path: 'edits/:id', component: EmocionesInsert },
    ],
  },

  // REPORTES
  {
    path: 'reportes', // Esto hace match con routerLink="/reportes"
    children: [
      { path: '', component: ReportesMenu }, // Al hacer clic en el botón "Promedio"
      { path: 'emociones-promedio', component: GrafPromemociointen }, // Muestra el GRÁFICO
      { path: 'alertas-conteo', component: GrafConteoComponent },
      { path: 'alertas-buscar', component: GrafBusquedaComponent },
      { path: 'alertas-promedio', component: GrafPromedioComponent },
      { path: 'alertas-criticas', component: GrafCriticasComponent },
      { path: 'pacientes-especialidad', component: PacientesEspecialidad },
      { path: 'buscar-pacientes', component: BusquedaPacientes },
    ],
  },

  // crisis/buscarporritmo
  // crisis/buscarporusurangofechas
  // crisis/cantidadporusu
  // emociones/busquedaemoint5
  // emociones/promemociointen

  {
    path: 'grabadora',
    component: GrabadoraComponent,
    canActivate: [roleGuard],
    data: { expectedRole: 'PACIENTE' },
  },
  {
    path: 'modo-reflexion',
    component: ModoReflexionComponent,
    canActivate: [roleGuard],
    data: { expectedRole: 'PACIENTE' },
  },
  {
    path: 'progreso',
    component: ProgresoComponent,
    canActivate: [roleGuard],
    data: { expectedRole: 'PACIENTE' },
  },
  {
    path: 'juegos',
    component: JuegosComponent,
    canActivate: [roleGuard],
    data: { expectedRole: 'PACIENTE' },
  },
  {
    path: 'biblioteca',
    component: BibliotecaComponent,
    canActivate: [roleGuard],
    data: { expectedRole: 'PACIENTE' },
  },

  {
    path: 'musica',
    component: Musica,
    canActivate: [roleGuard],
    data: {expectedRole: 'PACIENTE'}
  },

  {
    path: 'perfil',
    component: PerfilComponent,
    canActivate: [roleGuard],
  },
  { path: '**', redirectTo: 'inicio' },
];
