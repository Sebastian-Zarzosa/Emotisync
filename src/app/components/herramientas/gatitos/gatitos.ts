import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CatImage, Gatitosservice } from '../../../core/services/gatitosservice';

@Component({
  selector: 'app-gatitos',
  imports: [CommonModule, FormsModule],
  templateUrl: './gatitos.html',
  styleUrl: './gatitos.css',
  standalone: true,
})
export class Gatitos {
  // Inyectamos tu servicio
  private gatitosService = inject(Gatitosservice);

  cats: CatImage[] = [];
  loading: boolean = false;
  error: string = '';
  cantidad: number = 5; 

  ngOnInit(): void {
    this.loadCats();
  }

  loadCats(): void {
    this.loading = true;
    this.error = '';
    
    this.gatitosService.obtenerGatitos(this.cantidad).subscribe({
      next: (data) => {
        this.cats = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar los gatos';
        this.loading = false;
        console.error(err);
      }
    });
  }

  handleImageError(cat: CatImage): void {
    cat.url = 'http://via.placeholder.com/300x200/FF6B6B/FFFFFF?text=Error+Imagen';
  }

  viewLargeImagen(url: string): void {
    window.open(url, '_blank');
  }
}
