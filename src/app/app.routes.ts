import { Routes } from '@angular/router';
import { Inicio } from './components/inicio/inicio';
import { Conocer } from './components/conocer/conocer';
import { Usuario } from './components/usuario/usuario';
import { UsuarioInsert } from './components/usuario/usuario-insert/usuario-insert';
import { Sintoma } from './components/sintoma/sintoma';
import { SintomaInsert } from './components/sintoma/sintoma-insert/sintoma-insert';
import { PlanesSuscripcion } from './components/planes-suscripcion/planes-suscripcion';
import { PlanesSuscripcioninsertar } from './components/planes-suscripcion/planes-suscripcioninsertar/planes-suscripcioninsertar';
import { UsuarioSuscripcion } from './components/usuario-suscripcion/usuario-suscripcion';
import { UsuarioSuscripcioninsertar } from './components/usuario-suscripcion/usuario-suscripcioninsertar/usuario-suscripcioninsertar';
import { Alertas } from './components/alertas/alertas';
import { AlertasInsertar } from './components/alertas/alertas-insertar/alertas-insertar';
import { Recurso } from './components/recurso/recurso';
import { RecursoInsert } from './components/recurso/recurso-insert/recurso-insert';

export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: Inicio },
  { path: 'conocer', component: Conocer },

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
            { path: 'editar/:id', component: PlanesSuscripcioninsertar }
        ]
  },

  {
    path: 'usuario-suscripcion',
    component: UsuarioSuscripcion,
    children: [
      { path: 'insertar', component: UsuarioSuscripcioninsertar },
      { path: 'editar/:id', component: UsuarioSuscripcioninsertar }
    ]
  },

  { path: '', redirectTo: 'usuario-suscripcion', pathMatch: 'full' },
  
  {
    path: 'alerta',
    component: Alertas,
    children: [
      { path: 'insertar', component: AlertasInsertar },
      { path: 'editar/:id', component: AlertasInsertar }
    ]
  },

  { path: '', redirectTo: 'alerta', pathMatch: 'full'}
];
