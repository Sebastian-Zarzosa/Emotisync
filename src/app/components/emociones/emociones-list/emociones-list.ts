import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Emociones } from '../../../models/Emociones';
import { Emocionesservice } from '../../../services/emocionesservice';


@Component({
  selector: 'app-emociones-list',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule, RouterLink, MatCardModule, MatPaginatorModule],
  templateUrl: './emociones-list.html',
  styleUrl: './emociones-list.css',
})
export class EmocionesList implements OnInit{
  dataSource: MatTableDataSource<Emociones> = new MatTableDataSource();
  displayedColumns: string[] = ['idEmociones', 'tipoEmocion', 'intensidad', 'crisis', 'edit', 'delete' ];
  constructor(private emoService: Emocionesservice) {}
  cantidadRegistros: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    this.emoService.listar().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.cantidadRegistros = data.length; // waaa
      this.dataSource.paginator = this.paginator; // waaa
    });
    this.emoService.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.cantidadRegistros = data.length; // waaa
      this.dataSource.paginator = this.paginator; //waaa
    });
  }
  eliminar(id: number) {
    this.emoService.delete(id).subscribe((data) => {
      this.emoService.listar().subscribe((data) => {
        this.emoService.setList(data);
      });
    });
  }
}
