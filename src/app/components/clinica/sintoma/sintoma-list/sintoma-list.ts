import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Sintoma } from '../../../../models/sintoma';
import { Sintomaservice } from '../../../../core/services/sintomaservice';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-sintoma-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    MatPaginatorModule, 
    MatCardModule
  ],
  templateUrl: './sintoma-list.html',
  styleUrl: './sintoma-list.css',
})
export class SintomaList implements OnInit, AfterViewInit{
  dataSource: MatTableDataSource<Sintoma> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private sS: Sintomaservice) {}

  ngOnInit(): void {
    this.sS.list().subscribe((data) => {
      this.dataSource.data = data;
    });
    this.sS.getList().subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  eliminar(id: number) {
    this.sS.delete(id).subscribe({
      next: () => {
        // Si tiene éxito, actualiza la lista
        this.sS.list().subscribe((data) => {
          this.sS.setList(data);
        });
      },
      error: (err) => {
        // Si falla, muestra un error
        console.error('Error al eliminar el síntoma:', err);
        alert('Error al eliminar: Es posible que este síntoma esté siendo usado por otros registros (ej. en Crisis) y no pueda ser borrado.');
      },
    });
  }
}
