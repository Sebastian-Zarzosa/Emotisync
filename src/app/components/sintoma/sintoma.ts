import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { SintomaList } from './sintoma-list/sintoma-list';

@Component({
  selector: 'app-sintoma',
  imports: [RouterOutlet, SintomaList],
  templateUrl: './sintoma.html',
  styleUrl: './sintoma.css',
})
export class Sintoma {
  constructor(public route: ActivatedRoute) {}
}
