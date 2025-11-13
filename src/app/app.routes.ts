import { Routes } from '@angular/router';
import { Inicio } from './components/inicio/inicio';
import { Conocer } from './components/conocer/conocer';
import { Usuario } from './components/usuario/usuario';
import { UsuarioInsert } from './components/usuario/usuario-insert/usuario-insert';
import { Sintoma } from './components/sintoma/sintoma';
import { SintomaInsert } from './components/sintoma/sintoma-insert/sintoma-insert';
import { Recurso } from './components/recurso/recurso';
import { RecursoInsert } from './components/recurso/recurso-insert/recurso-insert';

export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: Inicio },
  { path: 'conocer', component: Conocer },

  {
    path: 'usuarios',
    component: Usuario,
    children: [
      { path: 'insert', component: UsuarioInsert },
      { path: 'edit/:id', component: UsuarioInsert },
    ],
  },

  {
    path: 'sintomas',
    component: Sintoma,
    children: [
      { path: 'insert', component: SintomaInsert },
      { path: 'edit/:id', component: SintomaInsert },
    ],
  },

   {
    path: 'recursos',
    component: Recurso,
    children: [
     
      { path: 'insert', component: RecursoInsert },
      { path: 'edit/:id', component: RecursoInsert },
    ],
  },
  // Redirige cualquier ruta no encontrada a inicio
  { path: '**', redirectTo: 'inicio' }
];
