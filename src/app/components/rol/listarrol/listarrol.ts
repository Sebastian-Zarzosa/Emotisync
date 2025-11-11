import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RolService } from '../../../services/rol.service';
import { Rol } from '../../../models/rol';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-softwarelistar',
  imports: [MatTableModule, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './listarrol.html',
  styleUrl: './listarrol.css',
})
export class Listarrol implements OnInit {
  dataSource: MatTableDataSource<Rol> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4'];

  constructor(private sS: RolService) {}

  ngOnInit(): void {
    this.sS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.sS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
  eliminar(id: number) {
    this.sS.delete(id).subscribe((data) => {
      this.sS.list().subscribe((data) => {
        this.sS.setList(data);
      });
    });
  }
}

