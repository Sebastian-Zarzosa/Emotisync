import { Routes } from '@angular/router';
import { PlanesSuscripcion } from './components/administracion/planes-suscripcion/planes-suscripcion';
import { PlanesSuscripcioninsertar } from './components/administracion/planes-suscripcion/planes-suscripcioninsertar/planes-suscripcioninsertar';
import { Insertarrol } from './components/administracion/rol/insertarrol/insertarrol';
import { Rol } from './components/administracion/rol/rol';
import { UsuarioSuscripcion } from './components/administracion/usuario-suscripcion/usuario-suscripcion';
import { UsuarioSuscripcioninsertar } from './components/administracion/usuario-suscripcion/usuario-suscripcioninsertar/usuario-suscripcioninsertar';
import { Usuario } from './components/administracion/usuario/usuario';
import { UsuarioInsert } from './components/administracion/usuario/usuario-insert/usuario-insert';
import { Login } from './components/auth/login/login';
import { Registro } from './components/auth/registro/registro';
import { Alertas } from './components/clinica/alertas/alertas';
import { AlertasInsertar } from './components/clinica/alertas/alertas-insertar/alertas-insertar';
import { Crisis } from './components/clinica/crisis/crisis';
import { CrisisInsert } from './components/clinica/crisis/crisis-insert/crisis-insert';
import { ModoReflexionComponent } from './components/clinica/crisis/modo-reflexion';
import { Sintoma } from './components/clinica/sintoma/sintoma';
import { SintomaInsert } from './components/clinica/sintoma/sintoma-insert/sintoma-insert';
import { PerfilComponent } from './components/dashboard/perfil/perfil';
import { Principal } from './components/dashboard/principal/principal';
import { BibliotecaComponent } from './components/herramientas/biblioteca/biblioteca';
import { Diario } from './components/herramientas/diario/diario';
import { DiarioInsertar } from './components/herramientas/diario/diario-insertar/diario-insertar';
import { Ejercicioinsertar } from './components/herramientas/ejercicios/ejercicioinsertar/ejercicioinsertar';
import { Ejercicios } from './components/herramientas/ejercicios/ejercicios';
import { GrabadoraComponent } from './components/herramientas/grabadora/grabadora';
import { JuegosComponent } from './components/herramientas/juegos/juegos';
import { ProgresoComponent } from './components/herramientas/progreso/progreso';
import { Recurso } from './components/herramientas/recurso/recurso';
import { RecursoInsert } from './components/herramientas/recurso/recurso-insert/recurso-insert';
import { UsuarioEjercicios } from './components/herramientas/usuario-ejercicios/usuario-ejercicios';
import { UsuarioEjerciciosinsertar } from './components/herramientas/usuario-ejercicios/usuario-ejerciciosinsertar/usuario-ejerciciosinsertar';
import { Conocer } from './components/landing/conocer/conocer';
import { Inicio } from './components/landing/inicio/inicio';
import { roleGuard } from './core/guard/role.guard';

import { GrafBusquedaComponent } from './components/administracion/reportes/r-alertas/graf-busqueda/graf-busqueda';
import { GrafConteoComponent } from './components/administracion/reportes/r-alertas/graf-conteo/graf-conteo';
import { GrafCriticasComponent } from './components/administracion/reportes/r-alertas/graf-criticas/graf-criticas';
import { GrafPromedioComponent } from './components/administracion/reportes/r-alertas/graf-promedio/graf-promedio';
import { GrafPromemociointen } from './components/administracion/reportes/r-emociones/graf-promemociointen/graf-promemociointen';
import { ReportesMenu } from './components/administracion/reportes/reportes-menu/reportes-menu';
import { Emociones } from './components/emociones/emociones';
import { EmocionesInsert } from './components/emociones/emociones-insert/emociones-insert';

import { BusqBuscarporritmo } from './components/administracion/reportes/r-crisis/busq-buscarporritmo/busq-buscarporritmo';
import { GrafCantidadporusu } from './components/administracion/reportes/r-crisis/graf-cantidadporusu/graf-cantidadporusu';
import { CrisisSintoma } from './components/clinica/crisis-sintoma/crisis-sintoma';
import { CrisisSintomaInsert } from './components/clinica/crisis-sintoma/crisis-sintomainsert/crisis-sintomainsert';

import { BusqBuscarporusurangofechas } from './components/administracion/reportes/r-crisis/busq-buscarporusurangofechas/busq-buscarporusurangofechas';
import { BusqBusquedaemoint5 } from './components/administracion/reportes/r-emociones/busq-busquedaemoint5/busq-busquedaemoint5';
import { BusqRelacionRecursos } from './components/administracion/reportes/r-recursos/busq-relacion-recursos/busq-relacion-recursos';
import { GrafPromedioRecursos } from './components/administracion/reportes/r-recursos/graf-promedio-recursos/graf-promedio-recursos';
import { BusqSintomas } from './components/administracion/reportes/r-sintomas/busq-sintomas/busq-sintomas';
import { BusquedaPacientes } from './components/administracion/reportes/r-usuarios/busqueda-pacientes/busqueda-pacientes';
import { PacientesEspecialidad } from './components/administracion/reportes/r-usuarios/pacientes-especialidad/pacientes-especialidad';
import { Chatbot } from './components/herramientas/chatbot/chatbot';
import { Gatitos } from './components/herramientas/gatitos/gatitos';
import { InformacionComponent } from './components/herramientas/informacion/informacion';
import { Musica } from './components/herramientas/musica/musica';
import { SugerenciasComponent } from './components/herramientas/sugerencias/sugerencias';
import { UsuarioListar } from './components/administracion/usuario/usuario-listar/usuario-listar';
import { REjercicios } from './components/administracion/reportes/r-ejercicios/r-ejercicios';
import { EjerciciosCompletados } from './components/administracion/reportes/r-ejercicios/ejercicios-completados/ejercicios-completados';
import { RepSuscripcionesActivas } from './components/administracion/reportes/r-suscripciones/rep-suscripciones-activas/rep-suscripciones-activas';
import { BusqHistorialEmail } from './components/administracion/reportes/r-suscripciones/busq-historial-email/busq-historial-email';
import { GrafRendimientoPlanes } from './components/administracion/reportes/r-suscripciones/graf-rendimiento-planes/graf-rendimiento-planes';
import { GrafMenosSuscriptores } from './components/administracion/reportes/r-suscripciones/graf-menos-suscriptores/graf-menos-suscriptores';
import { PlanesPacienteComponent } from './components/administracion/planes-suscripcion/planes-paciente/planes-paciente';
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
      { path: 'pacientes', component: UsuarioListar },
    ],
    canActivate: [roleGuard],
    data: { expectedRole: ['ADMIN', 'ESPECIALISTA'] },
  },
  {
    path: 'sintomas',
    component: Sintoma,
    children: [
      { path: 'insert', component: SintomaInsert }, // Antes era 'new'
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
    children: [
      { 
        path: 'insertar', 
        component: UsuarioSuscripcioninsertar, 
        canActivate: [roleGuard],
        data: { expectedRole: ['ADMIN', 'PACIENTE'] },
      },
      { path: 'editar/:id', component: UsuarioSuscripcioninsertar },
    ],
    
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
    data: { expectedRoles: ['PACIENTE', 'ADMIN'] },
  },
  {
    path: 'usuarioEjercicios',
    component: UsuarioEjercicios,
    children: [
      { path: 'insertar', component: UsuarioEjerciciosinsertar },
      { path: 'editar/:id', component: UsuarioEjerciciosinsertar },
    ],
    canActivate: [roleGuard],
    data: { expectedRoles: ['PACIENTE', 'ADMIN'] },
  },
  {
    path: 'recursos',
    component: Recurso,
    children: [
      { path: 'insert', component: RecursoInsert },
      { path: 'edit/:id', component: RecursoInsert },
    ],
    canActivate: [roleGuard],
    data: { expectedRoles: ['PACIENTE', 'ADMIN'] },
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
    data: { expectedRoles: ['PACIENTE', 'ADMIN'] },
  },
  {
    path: 'modo-reflexion',
    component: ModoReflexionComponent,
    canActivate: [roleGuard],
    data: { expectedRoles: ['PACIENTE', 'ADMIN'] },
  },
  {
    path: 'progreso',
    component: ProgresoComponent,
    canActivate: [roleGuard],
    data: { expectedRoles: ['PACIENTE', 'ADMIN'] },
  },
  {
    path: 'juegos',
    component: JuegosComponent,
    canActivate: [roleGuard],
    data: { expectedRoles: ['PACIENTE', 'ADMIN'] },
  },
  {
    path: 'biblioteca',
    component: BibliotecaComponent,
    canActivate: [roleGuard],
    data: { expectedRoles: ['PACIENTE', 'ADMIN'] },
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
      { path: 'crisis-cantidad', component: GrafCantidadporusu },
      { path: 'crisis-ritmo', component: BusqBuscarporritmo },
      { path: 'alertas-conteo', component: GrafConteoComponent },
      { path: 'alertas-buscar', component: GrafBusquedaComponent },
      { path: 'alertas-promedio', component: GrafPromedioComponent },
      { path: 'alertas-criticas', component: GrafCriticasComponent },
      { path: 'pacientes-especialidad', component: PacientesEspecialidad },
      { path: 'buscar-pacientes', component: BusquedaPacientes },
      { path: 'recursos-promedio', component: GrafPromedioRecursos },
      { path: 'recursos-relacion', component: BusqRelacionRecursos },
      { path: 'sintomas-buscar', component: BusqSintomas },
      { path: 'emociones-int5', component: BusqBusquedaemoint5 },
      { path: 'crisis-fechas', component: BusqBuscarporusurangofechas }, // el ts en reportes
      { path: 'buscar-ejercicios', component: REjercicios }, // el ts en reportes
      { path: 'ejercicios-completados', component: EjerciciosCompletados }, // el ts en reportes
      { path: 'suscripciones-activas', component: RepSuscripcionesActivas },
      { path: 'suscripciones-historial', component: BusqHistorialEmail },
      { path: 'suscripciones-rendimiento', component: GrafRendimientoPlanes },
      { path: 'suscripciones-baja-demanda', component: GrafMenosSuscriptores },
    ],
  },

  // crisis/buscarporritmo
  // crisis/buscarporusurangofechas
  // crisis/cantidadporusu
  // emociones/busquedaemoint5
  // emociones/promemociointen


  {
    path: 'musica',
    component: Musica,
    canActivate: [roleGuard],
    data: { expectedRoles: ['PACIENTE', 'ADMIN'] },
  },
  {
    path: 'informacion',
    component: InformacionComponent,
    canActivate: [roleGuard],
    data: { expectedRole: 'PACIENTE' },
  },
  {
    path: 'sugerencias',
    component: SugerenciasComponent,
    canActivate: [roleGuard],
    data: { expectedRole: 'PACIENTE' },
  },
  {
    path: 'chatbot',
    component: Chatbot,
    canActivate: [roleGuard],
    data: { expectedRole: 'PACIENTE' },
  },

  {
    path: 'perfil',
    component: PerfilComponent,
    canActivate: [roleGuard],
    data: { expectedRole: ['ADMIN', 'PACIENTE', 'ESPECIALISTA', 'FAMILIAR'] },
  },
  {
    path: 'planes-disponibles',
    component: PlanesPacienteComponent,
    canActivate: [roleGuard],
    data: { expectedRoles: ['PACIENTE'] }
  },

  // gatitos
  {
    path: 'gatitos',
    component: Gatitos,
    canActivate: [roleGuard],
    data: { expectedRoles: ['PACIENTE', 'ADMIN'] },
  },

  { path: '**', redirectTo: 'inicio' },
];
