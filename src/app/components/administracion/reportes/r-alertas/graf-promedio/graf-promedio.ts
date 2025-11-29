import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { ChartConfiguration, ChartType, ChartData } from 'chart.js';
import { AlertasService } from '../../../../../core/services/alertasservice';

@Component({
  selector: 'app-graf-promedio',
  standalone: true,
  imports: [CommonModule, FormsModule, MatInputModule, MatButtonModule, BaseChartDirective],
  providers: [provideCharts(withDefaultRegisterables())],
  templateUrl: './graf-promedio.html'
})
export class GrafPromedioComponent {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  nivel: number = 2;
  hasData = false;

  chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    elements: {
      line: { tension: 0.4 }
    }
  };
  chartType: ChartType = 'line';

  chartData: ChartData<'line'> = {
    labels: [],
    datasets: [
      { data: [], label: 'Promedio de Alertas', backgroundColor: 'rgba(255, 167, 38, 0.3)', borderColor: '#FFA726', fill: true }
    ]
  };

  constructor(private aService: AlertasService) {}

  generar() {
    this.aService.getPromedioCritico(this.nivel).subscribe({
      next: (data) => {
        console.log('DATOS PROMEDIO RECIBIDOS:', data);

        if (data && data.length > 0) {
          this.hasData = true;

    
          const etiquetas = data.map(item => item.nombreUsuario);

          
          const datosPromedio = data.map(item => item.promedio_alertas);

          this.chartData = {
            labels: etiquetas,
            datasets: [{
              data: datosPromedio,
              label: 'Promedio de Alertas',
              borderColor: '#FFA726',
              backgroundColor: 'rgba(255, 167, 38, 0.3)',
              pointBackgroundColor: '#fff',
              pointBorderColor: '#FFA726',
              fill: true
            }]
          };

          if (this.chart) {
            this.chart.update();
          }

        } else {
          this.hasData = false;
        }
      },
      error: (err) => {
        console.error(err);
        this.hasData = false;
      }
    });
  }
}