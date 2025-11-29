import { Component, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { AlertasService } from '../../../../../core/services/alertasservice';

@Component({
  selector: 'app-graf-conteo',
  standalone: true,
  imports: [BaseChartDirective, MatIconModule],
  providers: [provideCharts(withDefaultRegisterables())],
  templateUrl: './graf-conteo.html',
  styleUrl: './graf-conteo.css'
})
export class GrafConteoComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  hasData = false;
  
  barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false, // Añadido para que se adapte mejor
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1 } // Para que no salgan decimales
      }
    },
    plugins: {
      legend: { display: true, position: 'top' }
    }
  };
  
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;

  barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      { data: [], label: 'Alertas', backgroundColor: '#36A2EB' }
    ]
  };

  constructor(private aService: AlertasService) {}

  ngOnInit(): void {
    this.aService.getConteoUsuarios().subscribe({
      next: (data) => {
        console.log('DATOS CONFIRMADOS:', data);

        if (data && data.length > 0) {
          this.hasData = true;

          // 1. Eje X: Usamos 'nombreUsuario'
          this.barChartLabels = data.map(item => item.nombreUsuario);
          
          // 2. Eje Y: Usamos 'total_alertas'
          const datosCantidad = data.map(item => item.total_alertas);

          this.barChartData = {
            labels: this.barChartLabels,
            datasets: [
              {
                data: datosCantidad,
                label: 'Cantidad de Alertas',
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
                borderColor: '#1E88E5',
                borderWidth: 1
              }
            ]
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