import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Diario } from '../../../models/Diario';
import { Diarioservice } from '../../../services/diarioservice';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-diario-listar',
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    MatCardModule,
    MatPaginatorModule,
  ],
  templateUrl: './diario-listar.html',
  styleUrl: './diario-listar.css',
})
export class DiarioListar implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<Diario> = new MatTableDataSource();
  displayedColumns: string[] = [
    'fecha',
    'titulo',
    'contenido',
    'emociones',
    'usuario',
    'editar',
    'eliminar',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private diarioService: Diarioservice) {}

  ngOnInit(): void {
    this.diarioService.listar().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });

    this.diarioService.getLista().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  eliminar(id: number) {
    this.diarioService.eliminar(id).subscribe(() => {
      this.diarioService.listar().subscribe((data) => {
        this.diarioService.setLista(data);
      });
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
