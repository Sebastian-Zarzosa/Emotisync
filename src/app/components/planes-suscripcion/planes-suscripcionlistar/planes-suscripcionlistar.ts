import { Component } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterOutlet } from '@angular/router';
import { PlanesSuscripcionService } from '../../../services/planes_suscripcionservice';
import { planesSuscripcion } from '../../../models/planes_suscripcionModel';
import { Menu } from '../../menu/menu';
@Component({
  selector: 'app-planes-suscripcionlistar',
  imports: [MatTableModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    RouterOutlet,
    Menu
  ],
  templateUrl: './planes-suscripcionlistar.html',
  styleUrl: './planes-suscripcionlistar.css',
})
export class PlanesSuscripcionlistar {
  dataSource: MatTableDataSource<planesSuscripcion> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'];

  constructor(private pS: PlanesSuscripcionService) { }

  ngOnInit(): void {
    this.pS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.pS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  eliminar(id: number) {
    this.pS.delete(id).subscribe((data) => {
      this.pS.list().subscribe((data) => {
        this.pS.setList(data);
      });
    });
  }
}