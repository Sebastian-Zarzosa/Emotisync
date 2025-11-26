import { Component } from '@angular/core';
import { RouterOutlet, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { RecursoList } from './recurso-list/recurso-list';
import { SintomaList } from '../../clinica/sintoma/sintoma-list/sintoma-list';

@Component({
  selector: 'app-recurso',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RecursoList, SintomaList],
  templateUrl: './recurso.html',
  styleUrls: ['./recurso.css'],
})
export class Recurso {
  constructor(public route: Router) {}
}
