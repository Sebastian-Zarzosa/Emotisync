import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { ChartDataset, ChartOptions, ChartType, ChartConfiguration, ChartData } from 'chart.js';
import { EmocionesDTOList } from '../../../../../models/EmocionesDTOList';
import { Emocionesservice } from '../../../../../core/services/emocionesservice';

@Component({
  selector: 'app-busq-busquedaemoint5',
  imports: [CommonModule, BaseChartDirective, MatTableModule],
  templateUrl: './busq-busquedaemoint5.html',
  styleUrl: './busq-busquedaemoint5.css',
  providers: [provideCharts(withDefaultRegisterables())],
  standalone: true,
})
export class BusqBusquedaemoint5 implements OnInit {
  // Para la tabla
  listaEmociones: EmocionesDTOList[] = [];
  displayedColumns: string[] = ['id', 'tipo', 'fecha', 'usuario'];

  // Para el Gráfico de Pastel
    pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Distribución de Emociones Intensas (Nivel 5)' }
    }
  };
    pieChartType: ChartType = 'pie'; // o 'doughnut'
    pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [],
    datasets: [{ data: [] }]
  };

  constructor(private eService: Emocionesservice) {}

  ngOnInit(): void {
    this.eService.getbusquedaemoint5().subscribe({
      next: (data) => {
        this.listaEmociones = data; // Guardamos para la tabla
        this.procesarDatosParaGrafico(data); // Procesamos para el gráfico
      },
      error: (err) => {
        console.error("Error al traer emociones:", err);
      }
    });
  }

  procesarDatosParaGrafico(data: EmocionesDTOList[]) {
    // 1. Contamos cuántas veces aparece cada tipo de emoción
    // Ejemplo: { "Ira": 3, "Tristeza": 1, "Miedo": 2 }
    const contador: { [key: string]: number } = {};

    data.forEach(item => {
      const tipo = item.tipoEmocion || 'Sin Tipo';
      contador[tipo] = (contador[tipo] || 0) + 1;
    });

    // 2. Separamos las claves (labels) y los valores (data)
    const etiquetas = Object.keys(contador);
    const valores = Object.values(contador);

    // 3. Asignamos al gráfico
    this.pieChartData = {
      labels: etiquetas,
      datasets: [
        {
          data: valores,
          backgroundColor: [ // Colores variados
            '#FF6384', // Rojo suave
            '#36A2EB', // Azul suave
            '#FFCE56', // Amarillo
            '#4BC0C0', // Verde agua
            '#9966FF', // Morado
            '#FF9F40'  // Naranja
          ]
        }
      ]
    };
  }


  



}
