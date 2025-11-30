import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';

@Component({
  selector: 'app-busq-busquedaemoint5',
  imports: [],
  templateUrl: './busq-busquedaemoint5.html',
  styleUrl: './busq-busquedaemoint5.css',
  providers: [provideCharts(withDefaultRegisterables())],
  standalone: true,
})
export class BusqBusquedaemoint5 {




}
