import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { RecursoService } from '../../../../../core/services/recurso-service';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-graf-promedio-recursos',
  standalone: true,
  imports: [BaseChartDirective, MatIconModule, CommonModule],
  templateUrl: './graf-promedio-recursos.html',
  styleUrl: './graf-promedio-recursos.css',
  providers: [provideCharts(withDefaultRegisterables())],
})
export class GrafPromedioRecursos implements OnInit {
  hasData = false;
  
  barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Promedio' }
      }
    },
    plugins: {
      legend: { display: true, position: 'top' }
    }
  };

  barChartLabels: string[] = [];
  barChartLegend = true;
  barChartData: ChartDataset[] = [];
  barChartType: ChartType = 'bar'; // Gráfico de barras

  constructor(private rService: RecursoService) {}

  ngOnInit(): void {
    this.rService.getPromedioRecursos().subscribe({
      next: (data) => {
        console.log('Datos Promedio Recursos:', data);
        
        if (data && data.length > 0) {
          this.hasData = true;
          
          // Mapeamos los datos del DTO
          this.barChartLabels = data.map(item => item.nombreCreador);
          
          this.barChartData = [
            {
              data: data.map(item => item.promedioRecursos),
              label: 'Promedio de Recursos Creados',
              backgroundColor: 'rgba(54, 162, 235, 0.7)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1
            }
          ];
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