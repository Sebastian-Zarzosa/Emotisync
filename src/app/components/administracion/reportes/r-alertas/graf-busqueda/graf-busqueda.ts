import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { AlertasService } from '../../../../../core/services/alertasservice';

@Component({
  selector: 'app-graf-busqueda',
  standalone: true,
  imports: [CommonModule, FormsModule, MatInputModule, MatButtonModule, MatIconModule, BaseChartDirective],
  providers: [provideCharts(withDefaultRegisterables())],
  templateUrl: './graf-busqueda.html',
  styleUrl: './graf-busqueda.css'
})
export class GrafBusquedaComponent {
  letra: string = "";
  hasData = false;
  
  barChartOptions: ChartOptions = { responsive: true, indexAxis: 'y' }; // Barras horizontales
  barChartLabels: string[] = [];
  barChartData: ChartDataset[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;

  constructor(private aService: AlertasService) {}

  buscar() {
    if (this.letra) {
      this.aService.buscarPorNombre(this.letra).subscribe((data) => {
        if (data && data.length > 0) {
          this.hasData = true;
          this.barChartLabels = data.map(item => item.nombreUsuario);
          this.barChartData = [{
            data: data.map(item => item.nivel_alerta),
            label: 'Nivel de Alerta',
            backgroundColor: '#42A5F5',
          }];
        } else {
          this.hasData = false;
        }
      });
    }
  }
}