import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { CrisisList } from './crisis-list/crisis-list';

@Component({
  selector: 'app-crisis',
  imports: [RouterOutlet, CrisisList],
  templateUrl: './crisis.html',
  styleUrl: './crisis.css',
})
export class Crisis {
  constructor(public route:ActivatedRoute) {}
}
