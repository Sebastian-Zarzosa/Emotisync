import { Routes } from '@angular/router';
import { Inicio } from './components/inicio/inicio';
import { Conocer } from './components/conocer/conocer';
import { Usuario } from './components/usuario/usuario';
import { UsuarioInsert } from './components/usuario/usuario-insert/usuario-insert';
import { Sintoma } from './components/sintoma/sintoma';
import { SintomaInsert } from './components/sintoma/sintoma-insert/sintoma-insert';
import { PlanesSuscripcion } from './components/planes-suscripcion/planes-suscripcion';
import { PlanesSuscripcioninsertar } from './components/planes-suscripcion/planes-suscripcioninsertar/planes-suscripcioninsertar';

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

  //Rutas de planes de suscripcion
  { 
        path: 'planes', 
        component: PlanesSuscripcion,
        children: [
            { path: 'insertar', component: PlanesSuscripcioninsertar },
            { path: 'editar/:id', component: PlanesSuscripcioninsertar }
        ]
    }
];
