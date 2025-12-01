import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RecursoService } from '../../../core/services/recurso-service';
import { MatInputModule } from "@angular/material/input"; // Importar
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-biblioteca',
  standalone: true,
  imports: [CommonModule, MatExpansionModule, MatListModule, MatIconModule, MatInputModule, MatFormFieldModule],
  templateUrl: './biblioteca.html',
  styleUrls: ['./biblioteca.css']
})
export class BibliotecaComponent implements OnInit {
  
  // Estructura para agrupar recursos
  temas: any[] = [
    { titulo: 'Lecturas Recomendadas', icono: 'menu_book', recursos: [] },
    { titulo: 'Videos y Multimedia', icono: 'play_circle', recursos: [] },
    { titulo: 'Documentos de Apoyo', icono: 'description', recursos: [] }
  ];

  constructor(private recursoService: RecursoService) {}

  ngOnInit() {
    this.cargarRecursos();
  }

  cargarRecursos() {
    this.recursoService.list().subscribe(data => {
      // Clasificar los recursos reales de la BD en las categorías
      data.forEach((recurso: any) => {
        if (recurso.tipo === 'Lectura' || recurso.tipo === 'Libro') {
          this.temas[0].recursos.push(recurso);
        } else if (recurso.tipo === 'Video' || recurso.tipo === 'Audio') {
          this.temas[1].recursos.push(recurso);
        } else {
          this.temas[2].recursos.push(recurso);
        }
      });
    });
  }

  abrirRecurso(url: string) {
    window.open(url, '_blank');
  }
}