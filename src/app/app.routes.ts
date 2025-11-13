import { Routes } from '@angular/router';
import { Inicio } from './components/inicio/inicio';
import { Conocer } from './components/conocer/conocer';
import { Rol } from './components/rol/rol';
import { Insertarrol } from './components/rol/insertarrol/insertarrol';


export const routes: Routes = [
    {path: '', redirectTo: 'inicio', pathMatch: 'full'},
    {path: 'inicio', component: Inicio},
    {path: 'conocer', component: Conocer},
    {
    path: 'roles',
    component: Rol,
    children: [
        { path: 'insertar', component: Insertarrol },
        { path: 'edits/:id', component: Insertarrol },
    ],
  },
];

