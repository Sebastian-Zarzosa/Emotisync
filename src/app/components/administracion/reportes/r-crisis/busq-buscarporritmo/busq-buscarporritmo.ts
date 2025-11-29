import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { CrisisService } from '../../../../../core/services/crisisservice';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-busq-buscarporritmo',
  imports: [BaseChartDirective, MatIconModule,CommonModule,FormsModule,MatInputModule,MatButtonModule],
  templateUrl: './busq-buscarporritmo.html',
  styleUrl: './busq-buscarporritmo.css',
  providers: [provideCharts(withDefaultRegisterables())],
  standalone: true,
})


export class BusqBuscarporritmo implements OnInit {
  ritmoBusqueda: number | null = null;
  hasData = false;
  mensajeError = '';

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Duración (minutos)' }
      }
    },
    plugins: {
      legend: { display: true },
      title: { display: true, text: 'Crisis encontradas' }
    }
  };

  public barChartType: ChartType = 'line';
  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [{ data: [], label: 'Duración' }]
  };

  constructor(private cService: CrisisService) {}

  ngOnInit(): void {
  }

  buscar() {
    // Validación básica
    if (!this.ritmoBusqueda) {
      return; 
    }

    this.hasData = false;
    this.mensajeError = '';

    // Llamamos al servicio corregido pasando el número
    this.cService.getBuscarporritmo(this.ritmoBusqueda).subscribe({
      next: (data: any[]) => { // data es CrisisDTO[]

        console.log("Resultados:", data);

        if (data && data.length > 0) {
  this.hasData = true;

  // 1. Obtenemos todas las FECHAS únicas para el Eje X (ordenadas)
  // Esto asegura que el tiempo vaya de izquierda a derecha correctamente
  const fechasUnicas = [...new Set(data.map(item => item.fecha))].sort();
  
  // Asignamos las fechas al Eje X
  this.barChartData.labels = fechasUnicas;

  // 2. Agrupamos los datos por nombre de usuario
  const datosPorUsuario = new Map<string, any[]>();

  data.forEach(item => {
    const usuario = item.usuario?.username || 'Desconocido';
    if (!datosPorUsuario.has(usuario)) {
      datosPorUsuario.set(usuario, []);
    }
    datosPorUsuario.get(usuario)?.push(item);
  });

  // 3. Creamos un "dataset" (una línea) para cada usuario
  const nuevosDatasets: any[] = [];

  datosPorUsuario.forEach((crisisDelUsuario, nombreUsuario) => {
    
    // Aquí hacemos coincidir los datos con las fechas del Eje X
    // Si el usuario no tuvo crisis en esa fecha, ponemos null (para que no pinte nada)
    const dataAlineada = fechasUnicas.map(fecha => {
      const crisisEnFecha = crisisDelUsuario.find(c => c.fecha === fecha);
      return crisisEnFecha ? crisisEnFecha.tiempoRespuesta : null;
    });

    // Generamos un color aleatorio para cada usuario para diferenciarlos
    const color = this.generarColorAleatorio();

    nuevosDatasets.push({
      data: dataAlineada,
      label: nombreUsuario, // El nombre del usuario aparecerá en la leyenda
      borderColor: color,
      backgroundColor: color,
      pointBackgroundColor: color,
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: color,
      fill: false, // Importante para que sea solo línea
      tension: 0.1 // Para que la línea sea un poco curva (estético)
    });
  });

  // 4. Actualizamos el gráfico
  this.barChartData.datasets = nuevosDatasets;

}
        
        
        else {
          // Si devuelve lista vacía
          this.mensajeError = "No se encontraron crisis con ese ritmo.";
        }

      },
      error: (err) => {
        console.error("Error búsqueda:", err);
        this.mensajeError = "No se encontraron resultados (404) o hubo un error.";
      }
    });
  }

  generarColorAleatorio() {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return `rgba(${r},${g},${b},1)`;
}

}
