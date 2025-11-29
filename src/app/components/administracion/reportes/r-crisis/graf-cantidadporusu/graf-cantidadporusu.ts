import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { CrisisService } from '../../../../../core/services/crisisservice';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-graf-cantidadporusu',
  imports: [BaseChartDirective, MatIconModule,CommonModule],
  templateUrl: './graf-cantidadporusu.html',
  styleUrl: './graf-cantidadporusu.css',
  providers: [provideCharts(withDefaultRegisterables())],
})
export class GrafCantidadporusu implements OnInit {
  hasData = false;
  barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
        y: { 
          beginAtZero: true, // Importante: Que las barras empiecen desde 0
          title: { display: true, text: 'N° de Crisis' },
          ticks: {
          stepSize: 1, // contar de 1 en 1 (0, 1, 2, 3...)
          precision: 0 // evita decimales forzados
        }
        } 
      }
  };

  barChartLabels: string[] = [];
  barChartLegend = true;
  barChartData: ChartDataset[] = [];
  // tipo 'pie' (torta), 'bar' (barras), 'doughnut' (dona)
  barChartType: ChartType = 'bar';

  constructor(private cService: CrisisService) {}
  
  ngOnInit(): void {
    // Llamamos al servicio con el nombre que creamos antes
    this.cService.getCantidadporusu().subscribe((data) => {
      console.log('Datos Crisis llegando:', data); 
      if (data && data.length > 0) {
        this.hasData = true;
        // 1. ETIQUETAS: Usamos el ID del usuario
        // data viene como: [{idCrisis: 1, quantityCrisis: 5}...]
        this.barChartLabels = data.map((item: any) => 'Usuario ' + item.idCrisis);
        // 2. DATOS: Usamos la cantidad
        this.barChartData = [
          {
            data: data.map((item: any) => item.quantityCrisis),
            label: 'Cantidad de Crisis', 
            backgroundColor: '#ec407a', // Rosa vibrante
            hoverBackgroundColor: '#d81b60', // Rosa oscuro al pasar el mouse
            borderColor: '#c2185b',
            borderWidth: 1
          },
        ];

        
      } else {
        this.hasData = false;
      }
    });
  }
}
