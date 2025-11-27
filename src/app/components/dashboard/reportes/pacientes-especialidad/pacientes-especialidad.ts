import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { UsuarioService } from '../../../../core/services/usuarioservice';
import {
  BaseChartDirective,
  provideCharts,
  withDefaultRegisterables,
} from 'ng2-charts';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-pacientes-especialidad',
  imports: [BaseChartDirective, MatIconModule],
  templateUrl: './pacientes-especialidad.html',
  styleUrl: './pacientes-especialidad.css',
  providers: [provideCharts(withDefaultRegisterables())],
})
export class PacientesEspecialidad implements OnInit {
  hasData = false;
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barChartLegend = true;
  barChartData: ChartDataset[] = [];
  barChartType: ChartType = 'pie';

  constructor(private usuarioService: UsuarioService) {}
  ngOnInit(): void {
    this.usuarioService.getPacientesPorEspecialidad().subscribe((data) => {
      if (data.length > 0) {
        this.hasData = true;
        this.barChartLabels = data.map((item) => item.especialidad);
        this.barChartData = [
          {
            data: data.map((item) => item.cantidadPacientes),
            label: 'Cantidad de Pacientes por Especialidad',
            backgroundColor: [
              'rgba(7, 105, 122, 0.88)',
              'rgba(56, 176, 206, 1)',
            ],
          },
        ];
      } else {
        this.hasData = false;
      }
    });
  }
}
