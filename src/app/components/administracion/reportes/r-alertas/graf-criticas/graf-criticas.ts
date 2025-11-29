import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { AlertasService } from '../../../../../core/services/alertasservice';

@Component({
  selector: 'app-graf-criticas',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  providers: [provideCharts(withDefaultRegisterables())],
  templateUrl: './graf-criticas.html'
})
export class GrafCriticasComponent implements OnInit {
  hasData = false;
  
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right', // Leyenda a la derecha para que se vea mejor
      }
    }
  };
  public pieChartType: ChartType = 'pie'; // Gráfico de Pastel
  
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [],
    datasets: [ { data: [] } ]
  };

  constructor(private aService: AlertasService) {}

  ngOnInit() {
    this.aService.getAlertasCriticas(4).subscribe({
      next: (data) => {
        console.log('DATOS CRITICAS (NUEVO):', data); // Verifica que ahora llegue 'nombreUsuario'

        if (data && data.length > 0) {
          this.hasData = true;

          // CORRECCIÓN AQUÍ: Usamos nombreUsuario en lugar del ID
          // Si el backend lo manda como 'nombre', usa u.nombre. Si es 'nombreUsuario', usa u.nombreUsuario.
          // Basado en el DTO de arriba:
          const etiquetas = data.map(u => u.nombreUsuario); 
          
          const datos = data.map(u => u.nivelMaximo);

          this.pieChartData = {
            labels: etiquetas, // <--- Aquí pasamos los nombres
            datasets: [{
              data: datos,
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
              hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
            }]
          };
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