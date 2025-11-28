import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RolService } from '../../../../core/services/rolservice';
import { Rol } from '../../../../models/rol';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from "@angular/material/card";
import { MatPaginatorModule } from "@angular/material/paginator";

@Component({
  selector: 'app-listarrol',
  imports: [MatTableModule, MatButtonModule, MatIconModule, RouterLink, MatCardModule, MatPaginatorModule],
  templateUrl: './listarrol.html',
  styleUrl: './listarrol.css',
})
export class Listarrol implements OnInit {
  dataSource: MatTableDataSource<Rol> = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'nombreRol', 'edit', 'delete'];

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

