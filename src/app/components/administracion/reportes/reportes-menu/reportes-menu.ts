import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-reportes-menu',
  imports: [RouterLink, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './reportes-menu.html',
  styleUrl: './reportes-menu.css',
  standalone: true
})
export class ReportesMenu {

}
