import { Routes } from '@angular/router';
import { Inicio } from './components/inicio/inicio';
import { Conocer } from './components/conocer/conocer';
import { Usuario } from './components/usuario/usuario';
import { UsuarioInsert } from './components/usuario/usuario-insert/usuario-insert';
import { Diario } from './components/diario/diario';
import { DiarioInsertar } from './components/diario/diario-insertar/diario-insertar';

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
    path: 'diarios',
    component: Diario,
    children: [
      { path: 'insert', component: DiarioInsertar },
      { path: 'edit/:id', component: DiarioInsertar },
    ],
  },
];
