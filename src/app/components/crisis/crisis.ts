import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { CrisisList } from './crisis-list/crisis-list';

@Component({
  selector: 'app-crisis',
  standalone: true,
  imports: [RouterOutlet, CrisisList],
  templateUrl: './crisis.html',
})
export class Crisis {
  constructor(public route: ActivatedRoute) {}
}