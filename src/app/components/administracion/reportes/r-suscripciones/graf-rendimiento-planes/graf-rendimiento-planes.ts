import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { UsuarioSuscripcionService } from '../../../../../core/services/usuario_suscripcionservice';

@Component({
  selector: 'app-graf-rendimiento-planes',
  standalone: true,
  imports: [BaseChartDirective, MatIconModule, CommonModule],
  templateUrl: './graf-rendimiento-planes.html',
  styleUrl: './graf-rendimiento-planes.css',
  providers: [provideCharts(withDefaultRegisterables())],
})
export class GrafRendimientoPlanes implements OnInit {
  hasData = false;
  
  barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Cantidad / Ingreso Estimado' }
      }
    },
    plugins: {
      legend: { display: true, position: 'top' }
    }
  };

  barChartLabels: string[] = [];
  barChartLegend = true;
  barChartData: ChartDataset[] = [];
  barChartType: ChartType = 'bar'; 

  constructor(private usService: UsuarioSuscripcionService) {}

  ngOnInit(): void {
    this.usService.buscarPlanRendimiento().subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          this.hasData = true;
          
          this.barChartLabels = data.map(item => item.nombrePlan);
          
          this.barChartData = [
            {
              // Suscriptores Activos
              data: data.map(item => item.suscriptoresActivos),
              label: 'Suscriptores Activos',
              backgroundColor: 'rgba(75, 192, 192, 0.7)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
              yAxisID: 'y-axis-1',
            },
            {
              // Ingreso Estimado
              data: data.map(item => item.precioTotalEstimado),
              label: 'Ingreso Estimado (S/.)',
              backgroundColor: 'rgba(255, 99, 132, 0.7)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
              yAxisID: 'y-axis-1',
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