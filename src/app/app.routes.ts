import { Routes } from '@angular/router';
import { Inicio } from './components/inicio/inicio';
import { Conocer } from './components/conocer/conocer';
import { Ejercicio } from './models/ejercicio';
import { Ejercicioinsertar } from './components/ejercicios/ejercicioinsertar/ejercicioinsertar';
import { Ejercicios } from './components/ejercicios/ejercicios';


export const routes: Routes = [
    {path: '', redirectTo: 'inicio', pathMatch: 'full'},
    {path: 'inicio', component: Inicio},
    {path: 'conocer', component: Conocer},
    {path: 'ejercicios',
        component: Ejercicios,
        children: [
            {path: 'news', component: Ejercicioinsertar},
            {path: 'edits/:id', component: Ejercicioinsertar},
        ],
    },
];
