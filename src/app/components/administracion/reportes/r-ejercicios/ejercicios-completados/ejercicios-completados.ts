import { Component } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { UsuarioEjerciciosService } from '../../../../../core/services/usuario-ejerciciosservice';
import {
  BaseChartDirective,
  provideCharts,
  withDefaultRegisterables,
} from 'ng2-charts';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-ejercicios-completados',
  imports: [BaseChartDirective, MatIconModule],
  templateUrl: './ejercicios-completados.html',
  styleUrl: './ejercicios-completados.css',
  providers: [provideCharts(withDefaultRegisterables())],
})
export class EjerciciosCompletados {
  hasData = false;
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barChartLegend = true;
  barChartData: ChartDataset[] = [];
  barChartType: ChartType = 'bar';

  constructor(private usuarioEjercicioService: UsuarioEjerciciosService) {}
  ngOnInit(): void {
    this.usuarioEjercicioService
      .ejerciciosCompletadosPorUsuario()
      .subscribe((data) => {
        if (data.length > 0) {
          this.hasData = true;
          this.barChartLabels = data.map((item) => item.apellido);
          this.barChartData = [
            {
              data: data.map((item) => item.ejerciciosCompletados),
              label: 'Cantidad de Ejercicios Completados por Usuario',
              backgroundColor: [
                'rgba(75, 143, 43, 0.88)',
                'rgba(150, 238, 100, 1)',
              ],
            },
          ];
        } else {
          this.hasData = false;
        }
      });
  }
}
