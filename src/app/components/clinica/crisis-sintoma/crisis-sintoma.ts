import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { CrisisSintomaList } from './crisis-sintomalist/crisis-sintomalist';

@Component({
  selector: 'app-crisis-sintoma',
  standalone: true,
  imports: [RouterOutlet, CrisisSintomaList],
  templateUrl: './crisis-sintoma.html',
  styleUrl: './crisis-sintoma.css'
})
export class CrisisSintoma {
  constructor(public route: ActivatedRoute) {}
}