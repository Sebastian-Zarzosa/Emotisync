import { Routes } from '@angular/router';
import { Inicio } from './components/inicio/inicio';
import { Conocer } from './components/conocer/conocer';
import { Usuario } from './components/usuario/usuario';
import { UsuarioInsert } from './components/usuario/usuario-insert/usuario-insert';
import { Sintoma } from './components/sintoma/sintoma';
import { SintomaList } from './components/sintoma/sintoma-list/sintoma-list';
import { SintomaInsert } from './components/sintoma/sintoma-insert/sintoma-insert';

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
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },

  { path: 'inicio', component: Inicio },
  { path: 'conocer', component: Conocer },

  {
    path: 'sintomas',
    component: Sintoma,
    children: [  
      { path: 'new', component: SintomaInsert },
      { path: 'edits/:id', component: SintomaInsert },
    ],
  },

  { path: '', redirectTo: 'sintomas', pathMatch: 'full' },
];
