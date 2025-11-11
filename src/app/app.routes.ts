import { Routes } from '@angular/router';
import { Inicio } from './components/inicio/inicio';
import { Conocer } from './components/conocer/conocer';
import { Sintoma } from './components/sintoma/sintoma';
import { SintomaList } from './components/sintoma/sintoma-list/sintoma-list';
import { SintomaInsert } from './components/sintoma/sintoma-insert/sintoma-insert';

export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },

  { path: 'inicio', component: Inicio },
  { path: 'conocer', component: Conocer },

  {
    path: 'sintomas',
    component: Sintoma,
    children: [
      { path: '', component: SintomaList },        
      { path: 'new', component: SintomaInsert },
      { path: 'edits/:id', component: SintomaInsert },
    ],
  },

  { path: '**', redirectTo: 'inicio' },
];
